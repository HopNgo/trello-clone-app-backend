import Joi from "joi";
import { getDB } from "../config/mongodb";
import { ObjectId } from "mongodb";
const columnCollectionName = "columns";

const columnCollectionSchema = Joi.object({
  boardId: Joi.string().required(),
  title: Joi.string().required().trim(),
  cardOrder: Joi.array().items(Joi.string()).default([]),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false),
});

const validateSchema = async (data: any) => {
  return await columnCollectionSchema.validateAsync(data, {
    abortEarly: false,
  });
};

const pushCardOrder = async (columnId: string, newCardId: string) => {
  try {
    const result = await getDB()
      .collection(columnCollectionName)
      .findOneAndUpdate(
        { _id: new ObjectId(columnId) },
        {
          $push: {
            cardOrder: newCardId,
          },
        },
        {
          returnDocument: "after",
        }
      );
    const { value } = result;
    console.log(value);
    return value;
  } catch (error: any) {
    throw new Error(error);
  }
};

const createNew = async (data: any) => {
  try {
    const value: Promise<any> = await validateSchema(data);
    await getDB().collection(columnCollectionName).insertOne(value);
    return value;
  } catch (error: any) {
    throw new Error(error);
  }
};

const updateColumn = async (id: string, data: any) => {
  try {
    const result = await getDB()
      .collection(columnCollectionName)
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: data },
        {
          returnDocument: "after",
        }
      );
    const { value } = result;
    console.log(value);
    return value;
  } catch (error: any) {
    throw new Error(error);
  }
};
const deleteColumn = async (id: string, data: any) => {
  try {
    console.log(data);
    const result = await getDB()
      .collection(columnCollectionName)
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: data },
        { returnDocument: "after" }
      );
    const { value } = result;
    console.log(value);
    return value;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const ColumnModel: {
  createNew: (data: any) => Promise<any>;
  updateColumn: (id: string, data: any) => Promise<any>;
  deleteColumn: (id: string, data: any) => Promise<any>;
  pushCardOrder: (columnId: string, newCardId: string) => Promise<any>;
} = {
  createNew,
  updateColumn,
  deleteColumn,
  pushCardOrder,
};
