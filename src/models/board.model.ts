import Joi from "joi";
import { getDB } from "../config/mongodb";

const boardCollectionName = "boards";

const boardCollectionSchema = Joi.object({
  title: Joi.string().required().trim(),
  columnOrder: Joi.array().items(Joi.string()).default([]),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false),
});

const validateSchema = async (data: any) => {
  return await boardCollectionSchema.validateAsync(data, { abortEarly: false });
};

const createNew = async (data: any) => {
  try {
    const value: Promise<any> = await validateSchema(data);
    await getDB().collection(boardCollectionName).insertOne(value);
    return value;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const BoardModel = { createNew };
