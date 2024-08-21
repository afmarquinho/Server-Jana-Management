import { Router } from "express";
import {
  createReport,
  deleteReport,
  getReportbyId,
  getReports,
  updateReport,
  updateReportProcessed,
} from "../handlers/reportController";
import handleInputErros from "../middlewares/handleInputErros";
import { reportValidationSchema } from "../middlewares/reportValidationSchema";
import { param } from "express-validator";
import { dueDateValidationSchema } from "../middlewares/dueDateValidationSchema";
import { authenticate } from "../middlewares/auth";

const router = Router();

// *ROUTING
router.use(authenticate)

router.get("/", getReports);

router.get(
  "/:id",
  [
    param("id").isInt().withMessage("El ID proporcionado no es válido"),
    handleInputErros,
  ],

  getReportbyId
);

router.post("/",reportValidationSchema, handleInputErros, createReport);

router.put("/:id", reportValidationSchema, handleInputErros, updateReport);

router.patch(
  "/:id",
  dueDateValidationSchema,
  handleInputErros,
  updateReportProcessed
);

router.delete("/:id", deleteReport);

export default router;
