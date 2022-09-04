import { BoardModel } from "./../models/board.model";
const createNew = async (data: any) => {
  try {
    
    const newBoard: any = await BoardModel.createNew(data);
    if (newBoard.columnOrder) delete newBoard.columnOrder;
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

const getBoardList = async () => {
  try {
    const result: any = await BoardModel.getBoardList();
    return result;
  } catch (error) {
    console.log(error);
  }
};

const findBoardByTitle = async (title: string) => {
  try {
    const result: any = await BoardModel.findBoardByTitle(title);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const updateBoard = async (id: string, data: any) => {
  try {
    const updateData = { ...data, updatedAt: Date.now() };
    if (updateData._id) delete updateData._id;
    const result: any = await BoardModel.updateBoard(id, updateData);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const boardService: {
  createNew: (data: any) => Promise<any>;
  getFullBoard: (boardId: string) => Promise<any>;
  updateBoard: (id: string, data: any) => Promise<any>;
  getBoardList: () => Promise<any>;
  findBoardByTitle: (title: string) => Promise<any>;
} = {
  createNew,
  getFullBoard,
  updateBoard,
  getBoardList,
  findBoardByTitle,
};
