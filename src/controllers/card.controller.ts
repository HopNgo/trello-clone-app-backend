import { httpStatusCode } from "../utilities/constants";
import { Request, Response } from "express";
import { cardService } from "../services/card.service";
import cloudinary from "../config/cloudinary";
import { UploadApiResponse } from "cloudinary";
const createNew = async (req: Request, res: Response) => {
  try {
    const data: {
      boardId: string;
      columnId: string;
      title: string;
      cover?: string;
    } = {
      boardId: req.body.boardId,
      columnId: req.body.columnId,
      title: req.body.title,
    };

    if (req.file) {
      let uploadedFile: UploadApiResponse;
      try {
        uploadedFile = await cloudinary.uploader.upload(req.file.path, {
          folder: "TrelloPhoto",
          resource_type: "auto",
        });
        data.cover = uploadedFile.secure_url;
      } catch (error) {
        return res.status(400).json({ message: "Cloudinary Error" });
      }
    }
    const result = await cardService.createNew(data);

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
  createNew: (req: Request, res: Response) => any;
  updateCard: (req: Request, res: Response) => Promise<void>;
  updateDestroyCards: (req: Request, res: Response) => Promise<void>;
} = { createNew, updateCard, updateDestroyCards };
