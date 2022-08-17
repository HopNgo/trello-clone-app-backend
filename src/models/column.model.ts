import Joi from "joi";
import { getDB } from "../config/mongodb";

const columnCollectionName = "columns";

const columnCollectionSchema = Joi.object({
  boardId: Joi.string().required(),
  title: Joi.string().required(),
  cardOrder: Joi.array().items(Joi.string()).default([]),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false),
});

const validateSchema = async (data: any) => {
  return await columnCollectionSchema.validateAsync(data, { abortEarly: false });
};

const createNew = async (data: any) => {
  try {
    const value: Promise<any> = await validateSchema(data);
    const result: Promise<any> = await getDB()
      .collection(columnCollectionName)
      .insertOne(value);
    return value;
  } catch (error) {
    console.log(error);
  }
};

export const ColumnModel = { createNew };
