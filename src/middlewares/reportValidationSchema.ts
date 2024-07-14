import { body } from "express-validator";


export const reportValidationSchema = [
  body("visitDate")
    .isDate() //? isISO8601 tambien se puede usar para validar de manera mas estricta este formato
    .withMessage("Digite una fecha de visita válida")
    .notEmpty()
    .withMessage("La fecha de visita no puede estar vacía")
    .custom((value) => {
      const today: Date = new Date();
      const visitDate: Date = new Date(value);
      return visitDate <= today;
    })
    .withMessage("Digite una fecha de visita válida"),

  body("name")
    .isString()
    .withMessage("El nombre de la cotización debe ser válido")
    .notEmpty()
    .withMessage("El nombre de la cotización no debe estar vacío"),

  body("customerName")
    .isString()
    .withMessage("Digite un nombre de cliente válido")
    .notEmpty()
    .withMessage("Nombre del cliente no puede estar vacío"),

  body("city")
    .isString()
    .withMessage("Ciudad debe ser válida")
    .notEmpty()
    .withMessage("El campo ciudad no puede estar vacío"),

  body("phoneNumber")
    .isString()
    .withMessage("Teléfono debe ser válido")
    .notEmpty()
    .withMessage("Teléfono no puede estar vacío"),

  body("email")
    .notEmpty()
    .withMessage("Email no puede estar vacío")
    .isEmail()
    .withMessage("Ingrese un correo electrónico válido"),

  body("dueDate")
    .isDate() //? isISO8601 tambien se puede usar para validar de manera mas estricta este formato
    .withMessage("La fecha de entrega de entrega debe ser válida")
    .notEmpty()
    .withMessage("El campo 'fecha de entrega' no puede estar vacío")
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
    .withMessage("Ingrese una texto válido para la descripción")
    .notEmpty()
    .withMessage("El campo descripción no puede estar vacío"),

  body("ref")
    .isString()
    .withMessage("Ingrese una referencia válida")
    .notEmpty()
    .withMessage("El campo 'referencia' no puede estar vacío"),

  body("workforce")
    .isArray({ min: 1 })
    .withMessage("Debe haber al menos 1 mano de obra"),

  body("workforce.*.workforce")
    .isString()
    .withMessage("El nombre de la mano de obra es inválido")
    .notEmpty()
    .withMessage("El nombre de la mano de obra no puede estar vacío"),

  body("workforce.*.workshift")
    .isInt()
    .withMessage("El turno debe ser un número válido")
    .notEmpty()
    .withMessage("El campo 'turno' no puede estar vacío")
    .custom((value) => value > 0)
    .withMessage("El turno debe ser un número válido"),

  body("material")
    .isArray({ min: 1 })
    .withMessage("Debe haber al menos 1 material"),

  body("material.*.material")
    .isString()
    .withMessage("El nombre del material es inválido")
    .notEmpty()
    .withMessage("El nombre del material no debe estar vacío"),

  body("material.*.quantity")
    .isNumeric()
    .withMessage("Digite una cantidad válida para cada material")
    .notEmpty()
    .withMessage("La cantidad de material no puede estar vacía")
    .custom((value) => value > 0)
    .withMessage("La cantidad de material debe ser válida"),
    
    body("material.*.unit")
    .isString()
    .withMessage("Digite una unidad del material válida")
    .notEmpty()
    .withMessage("La unidad de material no puede estar vacía"),
];

//? NOTA EXPLICATORIA DE LA VALIDACIÓN DEL ARRAY DE OBJETOS.
//* 'workforce.*.workforce':
//* workforce: ESTE ES EL NOMBRE DEL CAMPO DE LA SOLICITUD QUE SE ESPERA QUE SEA UN ARRAY.
//* "*": EL ASTERISCO ES UN COMODÍN QUE REPRESENTA A LA ITERACIÓN DE CADA ELEMENTO DEL ARRAY O ÍNDICE
//* workforce: ESTE ES EL NOMBRE DEL CAMPO QUE SE VA A EVALUAR EN CADA ELEMENTO O ÍNDICE (*).
//*  LO MISMO APLICA PARA EL ARRAY DE MATERIALES
