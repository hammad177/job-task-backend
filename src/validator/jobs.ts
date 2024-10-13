import Joi from "joi";
import { JoiDto } from "../utils";

export const createJobDTO = JoiDto({
  title: Joi.string().required(),
  description: Joi.string().required(),
});
