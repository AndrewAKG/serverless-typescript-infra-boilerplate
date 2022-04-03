import validator from '@middy/validator';
const traverse = require('json-schema-traverse');

const setAdditionalPropertiesFalse = (item, _key) => {
	if (item.properties != undefined) {
		item.additionalProperties = false;
	}
};

export const ensureSchemaFailUnknownProperties = (schema: any) => {
	if (!schema || !schema.properties) {
		throw new Error('schema does not have a body');
	}

	if (schema.properties.body) {
		traverse(schema.properties.body, { allKeys: true }, setAdditionalPropertiesFalse);
	}

	return schema;
};

export const schemaValidator = (schema: any) => {
	let modifiedSchema = ensureSchemaFailUnknownProperties(schema);

	// possible put schema cache here
	// coerceType: true prevents setting a single value as a array

	return validator({ ajvOptions: { coerceTypes: true }, inputSchema: modifiedSchema });
};
