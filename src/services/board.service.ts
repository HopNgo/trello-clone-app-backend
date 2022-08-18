import { BoardModel } from "./../models/board.model";
const createNew = async (data: any) => {
  try {
    const result: any = await BoardModel.createNew(data);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const boardService = { createNew };
