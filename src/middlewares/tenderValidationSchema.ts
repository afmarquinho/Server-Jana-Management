import { body } from "express-validator";

export const tenderValidationSchema = [
  body("reportId")
    .isNumeric()
    .withMessage("Id del reporte no es válido")
    .notEmpty()
    .withMessage("El Id del reporte no puede estar vacío"),

  body("userId")
    .isString()
    .withMessage("El id del usuario debe ser un número entero")
    .notEmpty()
    .withMessage("El id del usuario no debe estar vacío"),
];
