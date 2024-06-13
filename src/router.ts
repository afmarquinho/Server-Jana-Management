import { Router } from "express";
import {
  createReport,
  deleteReport,
  getReportbyId,
  getReports,
  updateReport,
  updateReportProcessed,
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
  getReportbyId
);

//? verificar la validacion del post cuando se ingresan letras en el param
router.post("/", createReport);

router.put(
  "/:id",
  param("id").isInt().withMessage("ID no válido"),
  updateReport
);

router.patch(
  "/:id",
  param("id").isInt().withMessage("ID no válido"),
  updateReportProcessed
);
router.delete(
  "/:id",
  param("id").isInt().withMessage("ID no válido"),

  deleteReport
);

export default router;
