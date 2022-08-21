import { cardValidation } from "../../validations/card.validation";
import express, { Router } from "express";
import { cardController } from "../../controllers/card.controller";

const router: Router = express.Router();

router.post("/addCard", cardValidation.createNew, cardController.createNew);

router.put("/updateCard/:id", cardValidation.updateCard, cardController.updateCard);

export const cardRoutes = router;
