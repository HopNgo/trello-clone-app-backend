import { httpStatusCode } from "../utilities/constants";
import { Request, Response } from "express";
import { cardService } from "../services/card.service";

const createNew = async (req: Request, res: Response) => {
  try {
    const data = {
      boardId: req.body.boardId,
      columnId: req.body.columnId,
      title: req.body.title,
      cover: req.file
        ? `${process.env.HOST}/static/uploads/${req.file?.filename}`
        : null,
    };
    const result = await cardService.createNew(data);
    console.log(req.file);
    res.status(httpStatusCode.OK).json(result);
  } catch (error: any) {
    res.status(httpStatusCode.INTERNAL_SERVER).json({
      errors: new Error(error).message,
    });
  }
};

const updateCard = async (req: Request, res: Response) => {
  try {
    const cardIdToUpdate: string = req.params.id;
    const result = await cardService.updateCard(cardIdToUpdate, req.body);
    console.log(result);
    res.status(httpStatusCode.OK).json(result);
  } catch (error: any) {
    res.status(httpStatusCode.INTERNAL_SERVER).json({
      errors: new Error(error).message,
    });
  }
};

const updateDestroyCards = async (req: Request, res: Response) => {
  try {
    const result = await cardService.updateDestroyCards(req.body);
    res.status(httpStatusCode.OK).json(result);
  } catch (error: any) {
    res.status(httpStatusCode.INTERNAL_SERVER).json({
      errors: new Error(error).message,
    });
  }
};
export const cardController: {
  createNew: (req: Request, res: Response) => Promise<void>;
  updateCard: (req: Request, res: Response) => Promise<void>;
  updateDestroyCards: (req: Request, res: Response) => Promise<void>;
} = { createNew, updateCard, updateDestroyCards };
