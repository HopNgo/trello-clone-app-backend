import { CardModel } from "../models/card.model";
import { ColumnModel } from "../models/column.model";
const createNew = async (data: any) => {
  try {
    const newCard: any = await CardModel.createNew(data);
    await ColumnModel.pushCardOrder(
      newCard.columnId.toString(),
      newCard._id.toString()
    );
    return newCard;
  } catch (error) {
    console.log(error);
  }
};

export const cardService = { createNew };
