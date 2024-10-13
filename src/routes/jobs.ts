import { Router } from "express";
import { createJob, getJob, getJobs } from "../controllers/jobs";
import validateRequestBody from "../middleware/validateRequestBody";
import { createJobDTO } from "../validator/jobs";

let route = Router();

route.post("/", validateRequestBody(createJobDTO), createJob);
route.get("/:jobId", getJob);
route.get("/", getJobs);

export default route;
