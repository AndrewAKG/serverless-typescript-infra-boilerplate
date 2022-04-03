import { AWSError } from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import DeleteItemInput = DocumentClient.DeleteItemInput;
import DeleteItemOutput = DocumentClient.DeleteItemOutput;
import GetItemInput = DocumentClient.GetItemInput;
import GetItemOutput = DocumentClient.GetItemOutput;
import PutItemInput = DocumentClient.PutItemInput;
import PutItemOutput = DocumentClient.PutItemOutput;
import QueryInput = DocumentClient.QueryInput;
import QueryOutput = DocumentClient.QueryOutput;
import ScanInput = DocumentClient.ScanInput;
import UpdateItemInput = DocumentClient.UpdateItemInput;
import UpdateItemOutput = DocumentClient.UpdateItemOutput;
import { PromiseResult } from 'aws-sdk/lib/request';
import { DynamoDBClient } from '../utils/dynamo-db';
import * as moment from 'moment';

const ddb = new DynamoDBClient().client;

export class GenericRepository {
	static addMetadataValues(params: PutItemInput) {
		const item = params.Item;
		this.addItemMetadataValues(item);
		return params;
	}

	private static addItemMetadataValues(item: any) {
		item.modifiedAt = moment.utc().toISOString();
		if (!item.createdAt) {
			item.createdAt = item.modifiedAt;
		}
	}

	async getItem(params: GetItemInput): Promise<PromiseResult<GetItemOutput, AWSError>> {
		return await ddb.get(params).promise();
	}

	// excluding internal values
	async findOne(params: GetItemInput): Promise<any> {
		let item = await this.findOneRaw(params);
		if (!item) {
			return null;
		}

		return GenericRepository.removeInternalValues(item);
	}

	// keeping internal values
	async findOneRaw(params: GetItemInput): Promise<any> {
		let data = await this.getItem(params);
		if (!data.Item) {
			return null;
		}

		return data.Item;
	}

	async putItem(params: DocumentClient.PutItemInput): Promise<PromiseResult<PutItemOutput, AWSError>> {
		GenericRepository.addMetadataValues(params);
		const result = await ddb.put(params).promise();
		return result;
	}

	async updateItem(params: UpdateItemInput): Promise<PromiseResult<UpdateItemOutput, AWSError>> {
		const result = await ddb.update(params).promise();
		return result;
	}

	async deleteItem(params: DeleteItemInput): Promise<PromiseResult<DeleteItemOutput, AWSError>> {
		const result = await ddb.delete(params).promise();
		return result;
	}

	async query(params: QueryInput): Promise<PromiseResult<QueryOutput, AWSError>> {
		const result = await ddb.query(params).promise();
		return result;
	}

	async scan(params: ScanInput): Promise<any> {
		let items = [];
		params = { ...params };
		let result;
		//
		do {
			result = await ddb.scan(params).promise();
			params.ExclusiveStartKey = result.LastEvaluatedKey;
			items = items.concat(result.Items);
		} while (result.LastEvaluatedKey);
		//
		return items;
	}

	static removeInternalValues(item: any) {
		delete item.pkey;
		delete item.skey;
		delete item.modifiedAt;
		return item;
	}
}
