import Joi, { allow } from "joi";
import { ObjectId } from "mongodb";
import { getDB } from "../config/mongodb";
import { customJoi } from "../utilities/constants";

const boardCollectionName = "boards";

const boardCollectionSchema = customJoi.object({
  title: Joi.string().required().trim(),
  cover: Joi.string().required(),
  columnOrder: Joi.array().items(Joi.string()).default([]),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false),
});
const validateSchema = async (data: any) => {
  return await boardCollectionSchema.validateAsync(data, {
    abortEarly: false,
  });
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

const getBoardList = async () => {
  try {
    const result = await getDB()
      .collection(boardCollectionName)
      .aggregate([
        {
          $match: {
            _destroy: false,
          },
        },
        { $unset: ["columnOrder"] },
      ])
      .toArray();
    console.log(result);
    return result;
  } catch (error: any) {
    throw new Error(error);
  }
};

const findBoardByTitle = async (title: string) => {
  try {
    await getDB()
      .collection(boardCollectionName)
      .createIndex({ title: "text" });

    const result = await getDB()
      .collection(boardCollectionName)
      .aggregate([
        {
          $match: {
            title: new RegExp(title, "i"),
            _destroy: false,
          },
        },
        {
          $limit: 5,
        },
        {
          $project: {
            _id: 1,
            title: 1,
          },
        },
      ])
      .toArray();
    console.log(result);
    return result;
  } catch (error: any) {
    throw new Error(error);
  }
};

const updateBoard = async (id: string, data: any) => {
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
      .updateOne(
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

export const BoardModel: {
  createNew: (data: any) => Promise<any>;
  getFullBoard: (boardId: string) => Promise<any>;
  pushColumnOrder: (boardId: string, newColumnId: string) => Promise<any>;
  updateBoard: (id: string, data: any) => Promise<any>;
  deleteItemColumnOrder: (boardId: string, columnId: string) => Promise<any>;
  getBoardList: () => Promise<any>;
  findBoardByTitle: (title: string) => Promise<any>;
} = {
  createNew,
  getFullBoard,
  pushColumnOrder,
  updateBoard,
  deleteItemColumnOrder,
  getBoardList,
  findBoardByTitle,
};
