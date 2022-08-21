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

    //remove columns from board if they have _destroy field equal true;

    board.columns = board.columns.filter((column: any) => !column._destroy);
    board.columnOrder = board.columns.map((column: any) => column._id);

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

export const boardService = { createNew, getFullBoard };
