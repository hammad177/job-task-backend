import { TError, TErrorResponseType, TSuccessCode } from "../types";
import { Response } from "express";

const ErrorResponseType: TErrorResponseType = {
  NOT_FOUND: 404,
  FORBIDDEN: 403,
  UNAUTHORIZE: 401,
  BAD_REQUEST: 400,
};
const SuccessCode: TSuccessCode = {
  SUCCESS: 200,
  CREATED: 201,
  NO_CONTENT: 204,
};

type ErrorType = keyof typeof ErrorResponseType;
type StatusType = keyof typeof SuccessCode;

// format http errors
function formatErrorResponse(error: any) {
  // mongoose validation errors
  if (error.name === "ValidationError") {
    const errors = Object.keys(error.errors).map((key) => {
      return error.errors[key].message;
    });
    return { status: 422, response: { success: false, message: errors } };
  }
  // mongoose unique violation errors
  if (error.name === "MongoServerError" && error.code === 11000) {
    const errors = Object.keys(error.keyPattern).map((key) => {
      return `${key.toUpperCase()} ALREADY IN USE`;
    });
    return {
      status: 422,
      response: { success: false, message: errors },
    };
  }
  const { type, message } = error;

  let err: TError = {
    status: 500,
    response: { success: false, message: ["something went wrong"] },
  };

  Object.keys(ErrorResponseType).forEach((key) => {
    const typeKey = key as keyof TErrorResponseType; // Type assertion to specify the type of 'key'

    if (type === ErrorResponseType[typeKey])
      err = {
        status: ErrorResponseType[typeKey],
        response: { success: false, message: [message] },
      };
  });

  return err;
}
// throw http error
export function throwErrorResponse(
  errorType: ErrorType,
  message: string | null = null
) {
  throw {
    type: ErrorResponseType[errorType],
    message: message ?? errorType,
  };
}

// send http error response
export function sendErrorResponse(res: Response, error: any) {
  const { status, response } = formatErrorResponse(error);
  console.log("<<===http server error===>>", response);
  res.status(status).json({ ...response, data: null });
}

// send http success response
export function sendResponse(
  res: Response,
  message: string | null = null,
  data: any | null = null,
  status: StatusType = "SUCCESS",
  success: boolean = true
) {
  res
    .status(SuccessCode[status])
    .json({ success, message: message ?? status, data });
}
