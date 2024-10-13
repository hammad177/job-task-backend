import { Request, Response } from "express";
import { sendErrorResponse, sendResponse, throwErrorResponse } from "../utils";
import JobsRepository from "../repository/jobs";
import jobQueue from "../jobs/job";

export const createJob = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;

    const { success, message, data } = await JobsRepository.createJob({
      title,
      description,
    });

    if (!success) return throwErrorResponse("BAD_REQUEST", message);

    // Add job to background queue to get the food image from the unsplash
    jobQueue.add({ jobId: data._id });

    sendResponse(res, message, data);
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

export const getJob = async (req: Request, res: Response) => {
  try {
    const jobId = req.params.jobId;

    const { success, message, data } = await JobsRepository.getJobById(jobId);

    if (!success) return throwErrorResponse("NOT_FOUND", message);

    sendResponse(res, message, data);
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

export const getJobs = async (req: Request, res: Response) => {
  try {
    const { success, message, data } = await JobsRepository.getJobs();

    if (!success) return throwErrorResponse("NOT_FOUND", message);

    sendResponse(res, message, data);
  } catch (error) {
    sendErrorResponse(res, error);
  }
};
