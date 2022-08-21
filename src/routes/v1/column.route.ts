import { columnValidation } from "../../validations/column.validation";
import express, { Router } from "express";
import { columnController } from "../../controllers/column.controller";

const router: Router = express.Router();

router.post(
  "/addColumn",
  columnValidation.createNew,
  columnController.createNew
);
router.put(
  "/updateColumn/:id",
  columnValidation.updateColumn,
  columnController.updateColumn
);

router.delete("/deleteColumn/:id", columnController.deleteColumn);

export const columnRoutes = router;
