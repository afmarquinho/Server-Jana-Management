import { Router } from "express";
import {
  createTender,
  getTenders,
  getTender,
  updateTender,
  deleteTender,
} from "../handlers/tender";
import handleInputErros from "../middlewares/handleInputErros";
import { tenderValidationSchema } from "../middlewares/tenderValidationSchema";

const router = Router();

router.post("/:id", createTender);
router.put("/:id", updateTender);

router.get("/", getTenders);
router.get("/:id", getTender);

router.delete("/:id", deleteTender);

export default router;
