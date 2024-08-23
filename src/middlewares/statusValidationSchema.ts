import { body } from "express-validator";

export const statusValidationSchema =[
    body("active")
    .isBoolean()
    .withMessage("El estado solo puede ser activo = verdadero o falso")
    .notEmpty()
    .withMessage("El estado no puede estar vacío"),
]