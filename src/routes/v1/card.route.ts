import { cardValidation } from "../../validations/card.validation";
import express, { Router } from "express";
import { cardController } from "../../controllers/card.controller";

const router: Router = express.Router();

router.post("/addCard", cardValidation.createNew, cardController.createNew);

export const cardRoutes = router;
