
import express, { Router } from "express";
import { columnController } from "../../controllers/column.controller";

const router: Router = express.Router();

router.post(
  "/addColumn",
  columnController.createNew
);
router.put(
  "/updateColumn/:id",
 
  columnController.updateColumn
);

router.delete("/deleteColumn/:id", columnController.deleteColumn);

export const columnRoutes = router;
