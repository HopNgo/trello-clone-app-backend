import { boardValidation } from "./../../validations/board.validation";
import express, { Router } from "express";
import { boardController } from "../../controllers/board.controller";

const router: Router = express.Router();

router.get("/:id", boardController.getFullBoard);

router.post("/addBoard", boardValidation.createNew, boardController.createNew);

router.put("/updateBoard/:id", boardValidation.updateColumnOrder, boardController.updateColumnOrder);


export const boardRoutes = router;
