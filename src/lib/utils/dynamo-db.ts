import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { DynamoDB } from 'aws-sdk';

export class DynamoDBClient {
	private _documentClient: DocumentClient;

	constructor() {
		let options: any = {
			convertEmptyValues: true,
			maxRetries: 9,
			httpOptions: {
				timeout: 5000
			}
		};

		this._documentClient = new DynamoDB.DocumentClient(options);
	}

	get client() {
		return this._documentClient;
	}
}
