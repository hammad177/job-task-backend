import { TJobsCreate, TJobsUpdate, TRepositoryPromise } from "../types";
import JobsModel from "../models/jobs";

class JobsRepository {
  createJob = ({ title, description }: TJobsCreate) => {
    return new Promise<TRepositoryPromise>(async (resolve, reject) => {
      try {
        const newJob = new JobsModel({
          title,
          description,
        });

        await newJob.save();

        resolve({
          success: true,
          message: "New Job Created Successfully",
          data: newJob,
        });
      } catch (error: any) {
        console.log("Failed to create job", error?.message || error);
        resolve({
          success: false,
          message: "Job Creation Failed",
          data: null,
        });
      }
    });
  };

  updateJob = ({ jobId, ...rest }: TJobsUpdate) => {};

  getJobs = () => {
    return new Promise<TRepositoryPromise>(async (resolve, reject) => {
      try {
        const jobs = await JobsModel.find();

        resolve({
          success: true,
          message: "Jobs fetched successfully",
          data: jobs,
        });
      } catch (error: any) {
        console.log("Failed to fetch jobs", error?.message || error);
        resolve({
          success: false,
          message: "Failed to fetch jobs",
          data: null,
        });
      }
    });
  };

  getJobById = (jobId: string) => {
    return new Promise<TRepositoryPromise>(async (resolve, reject) => {
      try {
        const job = await JobsModel.findById(jobId);

        if (!job)
          return resolve({
            success: false,
            message: "Job not found",
            data: null,
          });

        resolve({
          success: true,
          message: "Job fetched successfully",
          data: job,
        });
      } catch (error: any) {
        console.log("Failed to fetch job", error?.message || error);
        resolve({
          success: false,
          message: "Failed to fetch job",
          data: null,
        });
      }
    });
  };
}

export default new JobsRepository();
