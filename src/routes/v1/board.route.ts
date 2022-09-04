import express, { Router } from "express";
import { boardController } from "../../controllers/board.controller";

const router: Router = express.Router();

router.get("/", boardController.getBoardList);

router.get("/findBoard/:title", boardController.findBoardByTitle);

router.get("/:id", boardController.getFullBoard);

router.post("/addBoard", boardController.createNew);

router.put("/updateBoard/:id", boardController.updateBoard);

export const boardRoutes = router;
