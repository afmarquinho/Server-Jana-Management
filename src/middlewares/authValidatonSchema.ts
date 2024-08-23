import { body } from "express-validator";

export const authValidationSchema = [
  body("email")
    .notEmpty()
    .withMessage("Email y contraseña son requeridos")
    .isEmail()
    .withMessage("Ingrese un correo electrónico válido"),

  body("password").notEmpty().withMessage("Email y contraseña son requeridos"),
];
