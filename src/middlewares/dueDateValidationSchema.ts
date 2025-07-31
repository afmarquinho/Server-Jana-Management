import { body } from "express-validator";

export const dueDateValidationSchema = [
  body("dueDate")
    .isDate() //? isISO8601 tambien se puede usar para validar de manera mas estricta este formato
    .withMessage("fecha de entrega de entrega debe ser válida")
    .notEmpty()
    .withMessage("El campo 'fecha de entrega' no puede estar vacío")
    .custom((value) => {
      const today: Date = new Date();
      const dueDate: Date = new Date(value);
      return dueDate >= today;
    })
    .withMessage("No se puede procesar un informe con fecha vencida"),

     body("userId")
    .isNumeric() 
    .withMessage("El id del usuario debe ser un número válido")
    .notEmpty()
    .withMessage("El id del usuario no debe estar vacío")
    
];
