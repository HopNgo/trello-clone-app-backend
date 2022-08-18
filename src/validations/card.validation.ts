import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { httpStatusCode } from "../utilities/constants";

const createNew = async (req: Request, res: Response, next: NextFunction) => {
  const condition: any = Joi.object({
    boardId: Joi.string().required(),
    columnId: Joi.string().required(),
    title: Joi.string().required().trim(),
    cover: Joi.string().default(null),
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

export const cardValidation = { createNew };
