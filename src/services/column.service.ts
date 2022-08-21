import { BoardModel } from "../models/board.model";
import { CardModel } from "../models/card.model";
import { ColumnModel } from "../models/column.model";
const createNew = async (data: any) => {
  try {
    const newColumn: any = await ColumnModel.createNew(data);
    newColumn.cards = [];
    await BoardModel.pushColumnOrder(
      newColumn.boardId.toString(),
      newColumn._id.toString()
    );
    return newColumn;
  } catch (error) {
    console.log(error);
  }
};

const updateColumn = async (id: string, data: any) => {
  try {
    const updateData = { ...data, updatedAt: Date.now() };
    const cardsInstance = updateData.cards;
    if (updateData._id) delete updateData._id;
    if (updateData.cards) delete updateData.cards;
    const result: any = await ColumnModel.updateColumn(id, updateData);
    return { ...result, cards: cardsInstance };
  } catch (error) {
    console.log(error);
  }
};
const deleteColumn = async (id: string) => {
  try {
    const deleteData = { _destroy: true, updatedAt: Date.now() };
    const result: any = await ColumnModel.deleteColumn(id, deleteData);
    await BoardModel.deleteItemColumnOrder(result.boardId, id);
    await CardModel.updateDestroyCard(id);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const columnService = {
  createNew,
  deleteColumn,
  updateColumn,
};
