import { Schema, model, Types } from "mongoose";
import { TJobsModel } from "../types";

const JobsSchema = new Schema<TJobsModel>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "resolved", "failed"],
      default: "pending",
    },
    result: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export default model<TJobsModel>("jobs", JobsSchema);
