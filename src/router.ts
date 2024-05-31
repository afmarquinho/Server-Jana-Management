import { Router } from "express";
import {
  createReport,
  deleteReport,
  getReportbyId,
  getReports,
  updateReport,
} from "./handlers/report";
import handleInputErros from "./middlewares/handleInputErros";
import { reportValidationSchema } from "./middlewares/reportValidationSchema";
import { param } from "express-validator";

const router = Router();

// *ROUTING

router.get("/", getReports);
router.get(
  "/:id",
  param("id").isInt().withMessage("ID no válido"),
  handleInputErros,
  getReportbyId
);

router.post("/", reportValidationSchema, handleInputErros, createReport);

//? verificar la validacion del post cuando se ingresan letras en el param
router.put(
  "/:id",
  param("id").isInt().withMessage("ID no válido"),
  reportValidationSchema,
  handleInputErros,
  updateReport
);

router.delete(
  "/:id",
  param("id").isInt().withMessage("ID no válido"),
  handleInputErros,
  deleteReport
);

export default router;
