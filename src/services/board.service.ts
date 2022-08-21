import { BoardModel } from "./../models/board.model";
const createNew = async (data: any) => {
  try {
    const newBoard: any = await BoardModel.createNew(data);
    return newBoard;
  } catch (error) {
    console.log(error);
  }
};

const getFullBoard = async (boardId: string) => {
  try {
    const board: any = await BoardModel.getFullBoard(boardId);

    //add cards array into column field to board
    board.columns.forEach((column: any) => {
      column;
      column.cards = board.cards.filter(
        (card: any) =>
          card.columnId.toString() === column._id.toString() && !card._destroy
      );
    });
    delete board.cards;

    return board;
  } catch (error) {
    console.log(error);
  }
};

const updateColumnOrder = async (id: string, data: any) => {
  try {
    const updateData = { ...data, updatedAt: Date.now() };
    const result: any = await BoardModel.updateColumnOrder(id, updateData);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const boardService = { createNew, getFullBoard, updateColumnOrder };
