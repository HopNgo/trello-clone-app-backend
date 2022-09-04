import express, { Router } from "express";
import { cardController } from "../../controllers/card.controller";
import { upload } from "../../utilities/upload";

const router: Router = express.Router();

router.post("/addCard", upload.single("cover"), cardController.createNew);

router.put(
  "/updateCard/:id",

  cardController.updateCard
);

router.put(
  "/updateDestroyCards",

  cardController.updateDestroyCards
);

export const cardRoutes = router;
