import Joi from "joi";
import { ObjectId } from "mongodb";
import { resourceLimits } from "worker_threads";
import { getDB } from "../config/mongodb";

const cardCollectionName = "cards";

const cardCollectionSchema = Joi.object({
  boardId: Joi.string().required(),
  columnId: Joi.string().required(),
  title: Joi.string().required().trim(),
  cover: Joi.string().allow(null).default(null),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false),
});

const validateSchema = async (data: any) => {
  return await cardCollectionSchema.validateAsync(data, {
    abortEarly: false,
    allowUnknown: true,
  });
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

const updateDestroyCards = async (data: {
  columnId: string;
  _destroy: boolean;
  updatedAt: number;
}) => {
  try {
    const result = await getDB()
      .collection(cardCollectionName)
      .updateMany(
        { columnId: data.columnId },
        {
          $set: {
            _destroy: data._destroy,
          },
        },
        { multi: true }
      );
    return result;
  } catch (error: any) {
    throw new Error(error);
  }
};

const getCardsFromColumnId = async (columnId: string) => {
  try {
    const result = await getDB()
      .collection(cardCollectionName)
      .find({ columnId: columnId });
    return result.toArray() || [];
  } catch (error: any) {
    throw new Error(error);
  }
};

export const CardModel: {
  createNew: (data: any) => Promise<any>;
  updateDestroyCard: (columnId: string) => Promise<void>;
  updateCard: (id: string, data: any) => Promise<any>;
  updateDestroyCards: (data: {
    columnId: string;
    _destroy: boolean;
    updatedAt: number;
  }) => Promise<any>;
  getCardsFromColumnId: (columnId: string) => Promise<any>;
} = {
  createNew,
  updateDestroyCard,
  updateCard,
  updateDestroyCards,
  getCardsFromColumnId,
};
