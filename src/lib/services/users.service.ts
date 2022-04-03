import { Injector } from '@sailplane/injector';
import { UsersRepository } from '../repositories/user.repository';
import { CreateUserProfileRequest, UserProfileInfo } from '@lib/models/user-models';
import * as uuid from 'uuid';
import { ResponseError, ResponseCode } from '../utils/response';

export class UsersService {
	constructor(private usersRepo: UsersRepository) {}

	async createUserProfile(req: CreateUserProfileRequest) {
		const userId = uuid.v4();
		const user: UserProfileInfo = {
			userId,
			...req
		};

		await this.usersRepo.createUserProfile(user);
		return user;
	}

	async getUserProfile(userId: string) {
		const userProfile = await this.usersRepo.getUserProfile(userId);
		if (!userProfile) {
			throw new ResponseError(ResponseCode.ENTITY_NOT_FOUND, `user profile with id ${userId} not found`);
		}

		return userProfile;
	}
}

Injector.register(UsersService, [UsersRepository]);
