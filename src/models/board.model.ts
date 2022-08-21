import { ObjectID } from "bson";
import Joi from "joi";
import { ObjectId } from "mongodb";
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

const pushColumnOrder = async (boardId: string, newColumnId: string) => {
  try {
    const result = await getDB()
      .collection(boardCollectionName)
      .findOneAndUpdate(
        { _id: new ObjectId(boardId) },
        {
          $push: {
            columnOrder: newColumnId,
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

const getFullBoard = async (boardId: string) => {
  try {
    const result = await getDB()
      .collection(boardCollectionName)
      .aggregate([
        { $match: { _id: new ObjectId(boardId), _destroy: false } },
        {
          $addFields: {
            _id: { $toString: "$_id" },
          },
        },
        {
          $lookup: {
            from: "columns",
            localField: "_id",
            foreignField: "boardId",
            pipeline: [
              {
                $match: {
                  _destroy: false,
                },
              },
            ],
            as: "columns",
          },
        },
        {
          $lookup: {
            from: "cards",
            localField: "_id",
            foreignField: "boardId",
            pipeline: [
              {
                $match: {
                  _destroy: false,
                },
              },
            ],
            as: "cards",
          },
        },
      ])
      .toArray();
    return result[0] || {};
  } catch (error: any) {
    throw new Error(error);
  }
};

const updateColumnOrder = async (id: string, data: any) => {
  try {
    const result = await getDB()
      .collection(boardCollectionName)
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

const deleteItemColumnOrder = async (boardId: string, columnId: string) => {
  try {
    await getDB()
      .collection(boardCollectionName)
      .update(
        { _id: new ObjectId(boardId) },
        {
          $pull: {
            columnOrder: columnId,
          },
        },
        { multi: true }
      );
  } catch (error: any) {
    throw new Error(error);
  }
};

export const BoardModel = {
  createNew,
  getFullBoard,
  pushColumnOrder,
  updateColumnOrder,
  deleteItemColumnOrder,
};
