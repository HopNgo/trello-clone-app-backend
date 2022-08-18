import express, { Router, Request, Response } from "express";
import { boardRoutes } from "./board.route";
const router: Router = express.Router();

router.get("/status", (req: Request, res: Response) => {
  res.status(200).json({ hello: "hello" });
});

/// Board APIs

router.use("/boards", boardRoutes);

export const apiV1 = router;
