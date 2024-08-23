import { Router } from "express";
import {
  createTender,
  getTenders,
  getTender,
  updateTender,
  deleteTender,
} from "../handlers/tenderController";
import handleInputErros from "../middlewares/handleInputErros";
import { tenderValidationSchema } from "../middlewares/tenderValidationSchema";
import { authenticate } from "../middlewares/auth";

const router = Router();

router.use(authenticate)

router.post("/:id", createTender);
router.put("/:id", updateTender);

router.get("/", getTenders);
router.get("/:id", getTender);

router.delete("/:id", deleteTender);

export default router;
