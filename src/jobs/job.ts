import Bull from "bull";
import JobsRepository from "../repository/jobs";
import { REDIS } from "../constants";
import { getUnsplashUrl } from "../utils";

const jobQueue = new Bull("jobs", {
  redis: {
    host: REDIS.HOST,
    port: parseInt(REDIS.PORT, 10),
  },
});

// Process the job queue with Bull
jobQueue.process(async (job) => {
  const { jobId } = job.data;
  const { success } = await JobsRepository.getJobById(jobId);

  if (!success) {
    console.log("Failed to retrieve job with id", jobId);
    return;
  }

  // Simulate delay (random between 5 sec to 5 min in 5 sec steps)
  const delay = Math.floor(Math.random() * 12) * 5000 + 5000;
  console.log(`Job Started ${jobId} with delay ${delay} ms`);

  try {
    await new Promise((resolve) => setTimeout(resolve, delay));

    // Fetch image from Unsplash
    const response = await fetch(getUnsplashUrl());
    const data = await response.json();

    // Update the job's status and result in MongoDB
    JobsRepository.updateJob({
      jobId,
      status: "resolved",
      result: data?.[0]?.urls?.regular ?? undefined,
    });
  } catch (error) {
    JobsRepository.updateJob({
      jobId,
      status: "failed",
      result: undefined,
    });
  } finally {
    console.log("Job Done", jobId);
  }
});

export default jobQueue;
