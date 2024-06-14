import { body } from "express-validator";

export const reportValidationSchema = [
  body("visitDate")
    .isDate() //? isISO8601 tambien se puede usar para validar de manera mas estricta este formato
    .notEmpty()
    .custom((value) => {
      const today: Date = new Date();
      const visitDate: Date = new Date(value);
      return visitDate <= today;
    })
    .withMessage("La fecha de visita debe ser una fecha válida"),

  body("name")
    .isString()
    .notEmpty()
    .withMessage("El nombre de la cotización debe ser válido"),

  body("customerName")
    .isString()
    .notEmpty()
    .withMessage("Nombre del cliente debe ser válido"),

  body("city").isString().notEmpty().withMessage("Ciudad debe ser válida"),

  body("phoneNumber")
    .isString()
    .notEmpty()
    .withMessage("Teléfono debe ser válido"),

  body("email").isEmail().notEmpty().withMessage("Email debe ser válido"),

  body("dueDate")
    .isDate() //? isISO8601 tambien se puede usar para validar de manera mas estricta este formato
    .notEmpty()
    .custom((value) => {
      const today: Date = new Date();
      const dueDate: Date = new Date(value);
      return dueDate >= today;
    })
    .withMessage("La fecha de entrega debe ser válida"),

  body("priority")
    .isIn(["low", "medium", "high"])
    .withMessage("La prioridad debe ser Alta, Media o Baja"),

    body("description")
    .isString()
    .notEmpty()
    .withMessage("Ingrese una texto válido para la descripción"),

    body("ref")
    .isString()
    .notEmpty()
    .withMessage("Ingrese una referencia válida"),

  body("workforce")
    .isArray({ min: 1 })
    .withMessage("Debe haber al menos 1 mano de obra"),

  body("workforce.*.workforce")
    .isString()
    .notEmpty()
    .withMessage("El nombre de la mano de obra es inválido"),

  body("workforce.*.workshift")
    .isInt()
    .notEmpty()
    .custom((value) => value > 0)
    .withMessage("El turno debe ser un número válido"),

  body("material")
    .isArray({ min: 1 })
    .withMessage("Debe haber al menos 1 material"),

  body("material.*.material")
    .isString()
    .notEmpty()
    .withMessage("El nombre del material debe ser válido"),

  body("material.*.amount")
    .isNumeric()
    .notEmpty()
    .custom((value) => value > 0)
    .withMessage("La cantidad debe ser un número válido"),

  body("material.*.unit")
    .isString()
    .notEmpty()
    .withMessage("LA unidad de material es obligatorio"),
];

//? NOTA EXPLICATORIA DE LA VALIDACIÓN DEL ARRAY DE OBJETOS.
//* 'workforce.*.workforce':
//* workforce: ESTE ES EL NOMBRE DEL CAMPO DE LA SOLICITUD QUE SE ESPERA QUE SEA UN ARRAY.
//* "*": EL ASTERISCO ES UN COMODÍN QUE REPRESENTA A LA ITERACIÓN DE CADA ELEMENTO DEL ARRAY O ÍNDICE
//* workforce: ESTE ES EL NOMBRE DEL CAMPO QUE SE VA A EVALUAR EN CADA ELEMENTO O ÍNDICE (*).
//*  LO MISMO APLICA PARA EL ARRAY DE MATERIALES
