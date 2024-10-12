// database model types
export type TJobsModel = {
  title: string;
  description: string;
  status: "pending" | "resolved" | "failed";
  result?: string;
};
// utils folder types
export type TErrorResponseType = {
  NOT_FOUND: number;
  FORBIDDEN: number;
  UNAUTHORIZE: number;
  BAD_REQUEST: number;
};
export type TError = {
  status: TErrorResponseType[keyof TErrorResponseType];
  response: { success: boolean; message: string[] };
};
export type TSuccessCode = {
  SUCCESS: number;
  CREATED: number;
  NO_CONTENT: number;
};
