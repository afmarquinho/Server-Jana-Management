import { body } from "express-validator";

export const passwordValidationSchema = [
  body("password")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres")
    .matches(/[A-Z]/)
    .withMessage("La contraseña debe contener al menos una letra mayúscula")
    .matches(/[a-z]/)
    .withMessage("La contraseña debe contener al menos una letra minúscula")
    .matches(/[0-9]/)
    .withMessage("La contraseña debe contener al menos un número")
    .matches(/[!@#$%^&*(),.?\":{}|<>]/)
    .withMessage("La contraseña debe contener al menos un carácter especial"),
];
