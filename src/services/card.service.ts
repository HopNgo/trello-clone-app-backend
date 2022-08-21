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

const updateCard = async (id: string, data: any) => {
  try {
    const updateData = { ...data, updatedAt: Date.now() };
    if (updateData._id) delete updateData._id;
    const result: any = await CardModel.updateCard(id, updateData);
    return result;
  } catch (error) {
    console.log(error);
  }
};
export const cardService = { createNew, updateCard };
