import { httpStatusCode } from "../utilities/constants";
import { Request, Response } from "express";
import { columnService } from "../services/column.service";

const createNew = async (req: Request, res: Response) => {
  try {
    const result = await columnService.createNew(req.body);
    console.log(result);
    res.status(httpStatusCode.OK).json(result);
  } catch (error: any) {
    res.status(httpStatusCode.INTERNAL_SERVER).json({
      errors: new Error(error).message,
    });
  }
};

const updateColumn = async (req: Request, res: Response) => {
  try {
    const columnIdToUpdate: string = req.params.id;
    const result = await columnService.updateColumn(columnIdToUpdate, req.body);
    console.log(result);
    res.status(httpStatusCode.OK).json(result);
  } catch (error: any) {
    res.status(httpStatusCode.INTERNAL_SERVER).json({
      errors: new Error(error).message,
    });
  }
};
const deleteColumn = async (req: Request, res: Response) => {
  try {
    const columnIdToDelete: string = req.params.id;
    const result = await columnService.deleteColumn(columnIdToDelete);
    console.log(result);
    res.status(httpStatusCode.OK).json(result);
  } catch (error: any) {
    res.status(httpStatusCode.INTERNAL_SERVER).json({
      errors: new Error(error).message,
    });
  }
};

export const columnController = { createNew, updateColumn, deleteColumn };
