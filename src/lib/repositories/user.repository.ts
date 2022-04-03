import { Injector } from '@sailplane/injector';
import { GenericRepository } from './repository';
import { UserProfileInfo } from '../models/user-models';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

export class UsersRepository extends GenericRepository {
	constructor(private tableName: string) {
		super();
	}

	async createUserProfile(user: UserProfileInfo) {
		const params: DocumentClient.PutItemInput = {
			TableName: this.tableName,
			Item: {
				...user,
				pkey: user.userId,
				skey: 'profile'
			}
		};
		await this.putItem(params);
	}

	async getUserProfile(userId: string): Promise<UserProfileInfo> {
		const params: DocumentClient.GetItemInput = {
			TableName: this.tableName,
			Key: {
				pkey: userId,
				skey: 'profile'
			}
		};

		const result = await this.findOne(params);
		return result;
	}
}

Injector.register(UsersRepository, () => {
	let tableName = process.env.users_table_name;
	if (!tableName) {
		console.log('Environment variable users_table_name does not exist, returning null');
		return null;
	}
	return new UsersRepository(tableName);
});
