import { APIGatewayEvent } from 'aws-lambda';
import { usersApiWrapper } from '@lib/middlewares/wrapper';
import * as ServiceLocator from '@lib/utils/service-locator';
import { UsersService } from '@lib/services/users.service';
import { create_user_profile_request_schema, get_user_profile_request_schema } from './schemas/user-request-schema';

const usersService = ServiceLocator.get(UsersService);

export const createUserProfile = usersApiWrapper(async (event: APIGatewayEvent) => {
	const body = event.body as any;
	const profile = await usersService.createUserProfile(body);
	return profile;
}, create_user_profile_request_schema);

export const getUserProfile = usersApiWrapper(async (event: APIGatewayEvent) => {
	const profile = await usersService.getUserProfile(event.pathParameters.userId);
	return profile;
}, get_user_profile_request_schema);
