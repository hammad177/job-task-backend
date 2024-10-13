import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const validateRequestBody =
  (schema: Joi.Schema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const validationErrors = error.details.map((detail) => detail.message);
      res
        .status(422)
        .json({ success: false, data: null, message: validationErrors });
      return; // Ensure the function doesn't proceed after sending a response
    }

    // Remove extra fields that are not defined in the schema
    const filteredBody = Object.keys(value).reduce(
      (filtered: { [key: string]: any }, key) => {
        if (schema.describe().keys[key]) {
          filtered[key] = value[key];
        }
        return filtered;
      },
      {}
    );

    req.body = filteredBody;
    next(); // Move on to the next middleware
  };

export default validateRequestBody;
