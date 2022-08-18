import { CardModel } from "../models/card.model";
const createNew = async (data: any) => {
  try {
    const result: any = await CardModel.createNew(data);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const cardService = { createNew };
