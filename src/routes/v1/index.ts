import { columnRoutes } from "./column.route";
import express, { Router, Request, Response } from "express";
import { boardRoutes } from "./board.route";
import { cardRoutes } from "./card.route";
const router: Router = express.Router();

router.get("/status", (req: Request, res: Response) => {
  res.status(200).json({ hello: "hello" });
});

/// Board APIs

router.use("/boards", boardRoutes);

// Column APIs
router.use("/boards", columnRoutes);
router.use("/columns", columnRoutes);
router.use("/cards", cardRoutes);

export const apiV1 = router;
