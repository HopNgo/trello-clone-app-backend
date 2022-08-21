import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { customJoi, httpStatusCode } from "../utilities/constants";

const createNew = async (req: Request, res: Response, next: NextFunction) => {
  const condition: any = Joi.object({
    title: Joi.string().required().trim(),
    boardId: Joi.string().required(),
  });

  try {
    await condition.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error: any) {
    res.status(httpStatusCode.BAD_REQUEST).json({
      errors: new Error(error).message,
    });
  }
};

const updateColumn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const condition: any = customJoi.object({
    title: Joi.string().trim(),
  });

  try {
    await condition.validateAsync(req.body, {
      abortEarly: false,
    });
    next();
  } catch (error: any) {
    res.status(httpStatusCode.BAD_REQUEST).json({
      errors: new Error(error).message,
    });
  }
};



export const columnValidation = { createNew, updateColumn };
