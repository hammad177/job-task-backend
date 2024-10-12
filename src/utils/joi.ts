import Joi from "joi";

const validationMessages = {
  // String validations
  "string.min": "{#key} should be at least {#limit} characters long",
  "string.max": "{#key} should be no more than {#limit} characters long",
  "string.regex": "{#key} should match the specified pattern",
  "string.pattern.base":
    "{#key} must be at least 8 characters and include at least one lowercase, uppercase, number, and special character.",
  "string.base": "{#key} should be a string",
  "string.email": "{#key} should be a valid email",
  "string.empty": "{#key} cannot be empty",

  // Number validations
  "number.integer": "{#key} should be an integer",
  "number.positive": "{#key} should be a positive number",
  "number.negative": "{#key} should be a negative number",
  "number.base": "{#key} should be a number",
  "number.min": "{#key} should be minimum than or equal to {#limit}",
  "number.max": "{#key} should be greater than or equal to {#limit}",

  // Array validations
  "array.base": "{#key} should be an array",
  "array.empty": "{#key} cannot be an empty array",
  "array.length": "{#key} should have {#limit} items",
  "array.unique": "{#key} should contain unique items",

  // Boolean validations
  "boolean.base": "{#key} should be a boolean value",

  // Object validations
  "object.base": "{#key} should be an object",
  "object.required": "{#key} is required",
  "object.keys": "{#key} should contain the following keys: {#limit}",
  "object.unknown": "{#key} should not contain, unknown keys",

  // any validations
  "any.required": "{#key} is required",
};

export const JoiDto = (DtoBody: any) => {
  return Joi.object(DtoBody).unknown(true).messages(validationMessages);
};
