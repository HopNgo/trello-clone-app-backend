import Joi from "joi";
import { ObjectId } from "mongodb";
import { getDB } from "../config/mongodb";

const cardCollectionName = "cards";

const cardCollectionSchema = Joi.object({
  boardId: Joi.string().required(),
  columnId: Joi.string().required(),
  title: Joi.string().required().trim(),
  cover: Joi.string().default(null),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false),
});

const validateSchema = async (data: any) => {
  return await cardCollectionSchema.validateAsync(data, { abortEarly: false });
};

const createNew = async (data: any) => {
  try {
    const value: Promise<any> = await validateSchema(data);
    await getDB().collection(cardCollectionName).insertOne(value);
    return value;
  } catch (error: any) {
    throw new Error(error);
  }
};

const updateDestroyCard = async (columnId: string) => {
  try {
    await getDB()
      .collection(cardCollectionName)
      .updateMany(
        { columnId: columnId },
        {
          $set: {
            _destroy: true,
          },
        }
      );
  } catch (error: any) {
    throw new Error(error);
  }
};

const updateCard = async (id: string, data: any) => {
  try {
    const result = await getDB()
      .collection(cardCollectionName)
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

export const CardModel = { createNew, updateDestroyCard, updateCard };
