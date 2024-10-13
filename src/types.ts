// database model types
export type TJobStatus = "pending" | "resolved" | "failed";
export type TJobsModel = {
  title: string;
  description: string;
  status: TJobStatus;
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
// repository folder types
export type TJobsCreate = Pick<TJobsModel, "title" | "description">;
export type TJobsUpdate = Partial<TJobsModel> & {
  jobId: string;
};
export type TRepositoryPromise = {
  success: boolean;
  message: string;
  data: any;
};
