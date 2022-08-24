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
    if (updateData._destroy) {
      await ColumnModel.deleteItemCardOrder(result.columnId, id);
    }
    return result;
  } catch (error) {
    console.log(error);
  }
};

const updateDestroyCards = async (data: {
  columnId: string;
  _destroy: boolean;
}) => {
  try {
    const updateData = { ...data, updatedAt: Date.now() };
    //remove cards from columnId when _destroy: true
    if (updateData._destroy) {
      await CardModel.updateDestroyCards(updateData);
      await ColumnModel.updateColumn(updateData.columnId, {
        cardOrder: [],
        updatedAt: Date.now(),
      });
    } else {
      //archive cards from columnId when _destroy: false
      //return updated column after archive
      await CardModel.updateDestroyCards(updateData);
      const resultFromCard = await CardModel.getCardsFromColumnId(
        updateData.columnId
      );
      const cardOrderArray = resultFromCard.map((card: any) => card._id);
      const dataUpdateColumn = {
        cardOrder: cardOrderArray,
        updatedAt: Date.now(),
      };
      const resultFromColumn = await ColumnModel.updateColumn(
        updateData.columnId,
        dataUpdateColumn
      );
      const dataToReturn = {
        ...resultFromColumn,
        cards: [...resultFromCard],
      };
      return dataToReturn;
    }
  } catch (error) {
    console.log(error);
  }
};

export const cardService: {
  createNew: (data: any) => Promise<any>;
  updateCard: (id: string, data: any) => Promise<any>;
  updateDestroyCards: (data: {
    columnId: string;
    _destroy: boolean;
  }) => Promise<any>;
} = { createNew, updateCard, updateDestroyCards };
