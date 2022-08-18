import { boardValidation } from "./../../validations/board.validation";
import express, { Router } from "express";
import { boardController } from "../../controllers/boards.controller";

const router: Router = express.Router();

router.post("/addBoard", boardValidation.createNew, boardController.createNew);

export const boardRoutes = router;
