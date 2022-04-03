export interface ValidationRuleProperties {
	type?: string | string[];
	minLength?: number;
	maxLength?: number;
	enum?: Array<string>;
	minimum?: number;
	maximum?: number;
	format?: string;
	pattern?: string;
	multipleOf?: number;
	anyOf?: ValidationRuleProperties[];
	allOf?: ValidationRuleProperties[];
	required?: string[];
	properties?: object;
	minProperties?: number;
	patternProperties?: object;
	additionalProperties?: boolean;
	items?: ValidationRuleProperties;
	minItems?: number;
}

const DATE_TIME_PATTERN = '^(\\d{4})-(\\d{2})-(\\d{2})T(\\d{2})\\:(\\d{2})\\:(\\d{2})$';
const DATE_TIME_OPTIONAL_TZ_PATTERN =
	'^(\\d{4})-(\\d{2})-(\\d{2})T(\\d{2})\\:(\\d{2})\\:(\\d{2})((.\\d+)(\\-|\\+)(\\d{2})\\:(\\d{2}))?$';

export class ValidationRule {
	// Standard Field

	public static readonly string: ValidationRuleProperties = { type: 'string', minLength: 1 };
	public static readonly nullableString: ValidationRuleProperties = { type: ['string', 'null'], minLength: 1 };
	public static readonly string128: ValidationRuleProperties = { type: 'string', minLength: 1, maxLength: 128 };
	public static readonly date: ValidationRuleProperties = {
		type: 'string',
		minLength: 1,
		pattern: '^\\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$'
	};
	public static readonly dateOfBirth: ValidationRuleProperties = {
		type: 'string',
		minLength: 1,
		pattern: '^\\d{4}-(0[1-9]|1[012])(-(0[1-9]|[12][0-9]|3[01]))?$'
	};
	public static readonly dateTime: ValidationRuleProperties = { type: 'string', pattern: DATE_TIME_PATTERN };
	public static readonly dateTimeOptionalTZ: ValidationRuleProperties = {
		type: 'string',
		pattern: DATE_TIME_OPTIONAL_TZ_PATTERN
	};
	public static readonly dateTimeISO: ValidationRuleProperties = { type: 'string', format: 'date-time' };
	public static readonly booleanString: ValidationRuleProperties = { type: 'string', enum: ['true', 'false'] };
	public static readonly boolean: ValidationRuleProperties = { type: 'boolean' };
	public static readonly numeric: ValidationRuleProperties = { type: 'number' };
	public static readonly numeric128: ValidationRuleProperties = { type: 'number', maximum: 10 ** 128 - 1 };
	public static readonly positiveNumber: ValidationRuleProperties = { type: 'number', minimum: 1 };
	public static readonly uuid: ValidationRuleProperties = {
		type: 'string',
		pattern: '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$'
	};
	public static readonly gender: ValidationRuleProperties = { type: 'string', enum: ['Male', 'Female', 'Unknown'] };
	public static readonly email: ValidationRuleProperties = { type: 'string', format: 'email', maxLength: 128 };
	public static readonly timeZone: ValidationRuleProperties = {
		type: 'string',
		pattern: '^(GMT$|GMT[+-][0-9]{1,2}:[0-9]{2})$'
	};
	public static readonly array: ValidationRuleProperties = { type: 'array' };
	public static readonly arrayOfStrings: ValidationRuleProperties = {
		type: 'array',
		minItems: 1,
		items: ValidationRule.string
	};
	public static readonly notEmptyObject: ValidationRuleProperties = { type: 'object', minProperties: 1 };
	public static readonly address: ValidationRuleProperties = {
		type: 'object',
		required: ['street', 'city', 'region', 'country', 'postalCode'],
		properties: {
			street: ValidationRule.string,
			city: ValidationRule.string,
			region: ValidationRule.string,
			country: ValidationRule.string,
			postalCode: ValidationRule.string
		}
	};

	// coordinates
	public static readonly longitude: ValidationRuleProperties = { type: 'number', minimum: -180, maximum: 180 };
	public static readonly latitude: ValidationRuleProperties = { type: 'number', minimum: -90, maximum: 90 };
}
