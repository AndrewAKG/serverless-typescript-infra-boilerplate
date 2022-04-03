export interface ResponseCodeMessage {
	statusCode: number;
	message: string;
	debugMessage?: string;
}

export class ResponseError extends Error {
	_responseCodeMessage: ResponseCodeMessage;

	constructor(responseCodeMessage: ResponseCodeMessage, debugMessage?: string, statusCode?: number) {
		super(responseCodeMessage.debugMessage);

		if (statusCode) {
			responseCodeMessage.statusCode = statusCode;
		}
		if (debugMessage) {
			responseCodeMessage.debugMessage = debugMessage;
		}
		this._responseCodeMessage = responseCodeMessage;
	}
}

export class ResponseCode {
	public static readonly VALIDATION_ERROR: ResponseCodeMessage = {
		statusCode: 400,
		message: 'Generic validation error'
	};

	public static readonly ENTITY_NOT_FOUND: ResponseCodeMessage = {
		statusCode: 404,
		message: 'Entity not found'
	};

	public static readonly INTERNAL_SERVER_ERROR: ResponseCodeMessage = {
		statusCode: 500,
		message: 'Something went wrong! please try again later'
	};
}
