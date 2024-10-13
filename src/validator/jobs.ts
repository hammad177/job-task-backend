import Joi from "joi";
import { JoiDto } from "../utils";

export const createJobDTO = JoiDto({
  clientId: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
});
