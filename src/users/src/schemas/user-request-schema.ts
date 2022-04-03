import { ValidationRule } from '@lib/validators/validation-rules';

const profileSchema = {
	firstName: ValidationRule.string,
	lastName: ValidationRule.string,
	dateOfBirth: ValidationRule.dateOfBirth
};

export const create_user_profile_request_schema = {
	type: 'object',
	properties: {
		body: {
			type: 'object',
			required: Object.keys(profileSchema),
			properties: profileSchema
		}
	}
};

export const get_user_profile_request_schema = {
	type: 'object',
	properties: {
		pathParameters: {
			type: 'object',
			required: ['userId'],
			properties: {
				userId: ValidationRule.string
			}
		}
	}
};
