import { httpStatusCode } from "../utilities/constants";
import { Request, Response } from "express";
import { cardService } from "../services/card.service";

const createNew = async (req: Request, res: Response) => {
  try {
    const result = await cardService.createNew(req.body);
    console.log(result);
    res.status(httpStatusCode.OK).json(result);
  } catch (error: any) {
    res.status(httpStatusCode.INTERNAL_SERVER).json({
      errors: new Error(error).message,
    });
  }
};

export const cardController = { createNew };
