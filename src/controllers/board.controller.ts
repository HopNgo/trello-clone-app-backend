import { httpStatusCode } from "../utilities/constants";
import { Request, Response } from "express";
import { boardService } from "../services/board.service";

const createNew = async (req: Request, res: Response) => {
  try {
    const result = await boardService.createNew(req.body);
    console.log(result);
    res.status(httpStatusCode.OK).json(result);
  } catch (error: any) {
    res.status(httpStatusCode.INTERNAL_SERVER).json({
      errors: new Error(error).message,
    });
  }
};

const getFullBoard = async (req: Request, res: Response) => {
  try {
    const boardId: string = req.params.id;
    const result = await boardService.getFullBoard(boardId);
    console.log(result);
    res.status(httpStatusCode.OK).json(result);
  } catch (error: any) {
    res.status(httpStatusCode.INTERNAL_SERVER).json({
      errors: new Error(error).message,
    });
  }
};

export const boardController = { createNew, getFullBoard };
