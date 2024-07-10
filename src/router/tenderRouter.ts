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

router.post("/", tenderValidationSchema, handleInputErros, createTender);
router.put("/:id", tenderValidationSchema, handleInputErros, updateTender);

router.get("/", getTenders);
router.get("/:id", getTender);

router.delete("/:id", deleteTender);

export default router;
