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
    const boardId: string = req.params.id.trim();
    const result = await boardService.getFullBoard(boardId);
    res.status(httpStatusCode.OK).json(result);
  } catch (error: any) {
    res.status(httpStatusCode.INTERNAL_SERVER).json({
      errors: new Error(error).message,
    });
  }
};

const getBoardList = async (req: Request, res: Response) => {
  try {
    const result = await boardService.getBoardList();
    res.status(httpStatusCode.OK).json(result);
  } catch (error: any) {
    res.status(httpStatusCode.INTERNAL_SERVER).json({
      errors: new Error(error).message,
    });
  }
};

const findBoardByTitle = async (req: Request, res: Response) => {
  try {
    const title: string = req.params.title.trim();
    const result = await boardService.findBoardByTitle(title);
    res.status(httpStatusCode.OK).json(result);
  } catch (error: any) {
    res.status(httpStatusCode.INTERNAL_SERVER).json({
      errors: new Error(error).message,
    });
  }
};

const updateBoard = async (req: Request, res: Response) => {
  try {
    const columnIdToUpdate: string = req.params.id;
    const result = await boardService.updateBoard(columnIdToUpdate, req.body);
    console.log(result);
    res.status(httpStatusCode.OK).json(result);
  } catch (error: any) {
    res.status(httpStatusCode.INTERNAL_SERVER).json({
      errors: new Error(error).message,
    });
  }
};

export const boardController: {
  createNew: (req: Request, res: Response) => Promise<void>;
  getFullBoard: (req: Request, res: Response) => Promise<void>;
  updateBoard: (req: Request, res: Response) => Promise<void>;
  getBoardList: (req: Request, res: Response) => Promise<void>;
  findBoardByTitle: (req: Request, res: Response) => Promise<void>;
} = { createNew, getFullBoard, updateBoard, getBoardList, findBoardByTitle };
