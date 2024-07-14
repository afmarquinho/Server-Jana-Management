import { Router } from "express";
import {
  createReport,
  deleteReport,
  getReportbyId,
  getReports,
  updateReport,
  updateReportProcessed,
} from "../handlers/report";
import handleInputErros from "../middlewares/handleInputErros";
import { reportValidationSchema } from "../middlewares/reportValidationSchema";
import { body, check, param } from "express-validator";


const router = Router();

// *ROUTING

router.get("/", getReports);
router.get(
  "/:id",
  param("id").isInt().withMessage("El ID proporcionado no es válido"),
  handleInputErros,
  getReportbyId
);

router.post("/", reportValidationSchema, handleInputErros, createReport);
router.put("/:id", reportValidationSchema, handleInputErros, updateReport);

router.patch(
  "/:id",
  check("dueDate")
     .custom((value) => {
       const today: Date = new Date();
       const dueDate: Date = new Date(value);
       return dueDate >= today;
     })
     .withMessage("La fecha de entrega debe ser válida"),
   handleInputErros,
  updateReportProcessed
);

router.delete("/:id", deleteReport);

export default router;
