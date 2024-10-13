import { Express } from "express";
import JobsRoutes from "./jobs";

export default function appRoutes(app: Express) {
  app.use("/api/jobs", JobsRoutes);
}
