import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import httpEventNormalizer from '@middy/http-event-normalizer';
import httpCors from '@middy/http-cors';
import { Handler } from 'aws-lambda';
import { schemaValidator } from '@lib/validators/schema-validator';
import { ResponseError, ResponseCode } from '../utils/response';
import { HttpError } from 'http-errors';

export const usersApiWrapper = (handler: Handler, schema?: any) => {
	const middify = middy(handler).use([httpJsonBodyParser(), httpEventNormalizer(), httpCors()]);
	if (schema) {
		middify.use(schemaValidator(schema));
	}
	middify.use([handleError(), handleSuccess()]);
	return middify;
};

/**
 * Middleware to allow an async handler to return its exact response body.
 * This middleware will wrap it up as an APIGatewayProxyResult.
 * Must be registered as the last (thus first to run) "after" middleware.
 */
export const handleSuccess = () => ({
	after: (handler, next) => {
		console.log('handle success');
		// If response isn't a proper API result object, convert it into one.
		let r = handler.response;
		if (!r || typeof r !== 'object' || (!r.statusCode && !r.body)) {
			handler.response = {
				statusCode: 200,
				body: r ? JSON.stringify(r) : ''
			};
		}

		next();
	}
});

export const handleError = () => ({
	onError: (handler, next) => {
		console.log('handle error');
		let r = handler.response;
		if (handler.error instanceof HttpError && handler.error.status == 400) {
			handler.response = {
				statusCode: 400,
				body: JSON.stringify({
					message: 'validation error',
					debugMessage: handler.error.details
				})
			};
		} else if (handler.error instanceof ResponseError) {
			handler.response = {
				statusCode: handler.error._responseCodeMessage.statusCode,
				body: JSON.stringify({
					message: handler.error._responseCodeMessage.message,
					debugMessage: handler.error._responseCodeMessage.debugMessage
				})
			};
		} else if (!r || typeof r !== 'object' || (!r.statusCode && !r.body)) {
			handler.response = {
				statusCode: handler.error.status || 500,
				body: JSON.stringify({
					message: ResponseCode.INTERNAL_SERVER_ERROR.message,
					debugMessage: handler.error.message
				})
			};
		}

		next();
	}
});
