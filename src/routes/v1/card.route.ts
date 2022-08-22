import { cardValidation } from "../../validations/card.validation";
import express, { Router } from "express";
import { cardController } from "../../controllers/card.controller";

const router: Router = express.Router();

router.post("/addCard", cardValidation.createNew, cardController.createNew);

router.put(
  "/updateCard/:id",
  cardValidation.updateCard,
  cardController.updateCard
);

router.put(
  "/updateDestroyCards",
  cardValidation.updateDestroyCards,
  cardController.updateDestroyCards
);

export const cardRoutes = router;
