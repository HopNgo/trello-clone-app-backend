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
    const boards: any = await BoardModel.getFullBoard(boardId);
    boards.columns.forEach((column: any) => {
      column.cards = boards.cards.filter(
        (card: any) => card.columnId.toString() === column._id.toString()
      );
    });
    delete boards.cards;
    console.log(boards);
    return boards;
  } catch (error) {
    console.log(error);
  }
};

export const boardService = { createNew, getFullBoard };
