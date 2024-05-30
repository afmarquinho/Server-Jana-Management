import { body } from "express-validator";

// TODO: CAMBIAR EL TIPO DE DATOS DE VISIT DATE DE STRING A DATE Y VALIDAR CON FORMATO DATE

export const userValidationSchema = [
  //? body("visitDate").isDate().withMessage("Visit date must be a valid date"),
  body("visitDate")
    .notEmpty()
    .withMessage("La fecha de visita no puede estar vacía"),
  body("name")
    .notEmpty()
    .withMessage("El nombre de la cotización no puede estar vacío")
    .isLength({ min: 1 })
    .withMessage("Nombre es obligatorio"),
  body("customerName")
    .isString()
    .withMessage("Ingrese un nombre del cliente válido")
    .isLength({ min: 1 })
    .withMessage("el nombre del cliente es obligatorio"),
  body("nit")
    .isNumeric()
    .withMessage("NIT debe ser válido")
    .custom((value) => value > 0)
    .withMessage("NIT debe ser válido"),
  body("city")
    .isString()
    .withMessage("Ingrese una cuidad de Colombia válida")
    .isLength({ min: 1 })
    .withMessage("Ciudad es obligatorio"),
  body("address")
    .isString()
    .withMessage("Ingrese una dirección válida")
    .isLength({ min: 1 })
    .withMessage("Dirección es obligatorio"),
  body("phoneNumber")
    .isString()
    .withMessage("Ingrese un teléfono válido")
    .isLength({ min: 1 })
    .withMessage("Teléfono es obligatorio"),
  body("email").isEmail().withMessage("Ingrese un email válido"),
  //? body("dueDate").isDate().withMessage("Due date must be a valid date"),
  body("dueDate")
    .notEmpty()
    .withMessage("La fecha de entrega no puede estar vacía"),
  body("priority")
    .isIn(["low", "medium", "high"])
    .withMessage("La prioridad debe ser Alta, Media o Baja"),
  body("description")
    .isString()
    .withMessage("Ingrese una descripción válida")
    .isLength({ min: 1 })
    .withMessage("la descripción es obligatoria"),
  body("workforce")
    .isArray({ min: 1 })
    .withMessage("Debe haber al menos 1 mano de obra"),
  body("workforce.*.workforce")
    .isString()
    .withMessage("Ingrese una mano de obra válida")
    .isLength({ min: 1 })
    .withMessage("La mano de obra es obligatoria"),
  body("workforce.*.workShift")
    .isInt({ min: 1 })
    .withMessage("El turno debe ser válido")
    .custom((value) => value > 0)
    .withMessage("El turno debe ser válido"),
  body("materials")
    .isArray({ min: 1 })
    .withMessage("Debe haber al menos 1 material"),
  body("materials.*.material")
    .isString()
    .withMessage("Ingrese un material válido")
    .isLength({ min: 1 })
    .withMessage("Material es obligatorio"),
  body("materials.*.amount")
    .isNumeric()
    .withMessage("Amount must be a number")
    .custom((value) => value > 0)
    .withMessage("a cantidad debe ser válida"),
  body("materials.*.unit")
    .isString()
    .withMessage("La unidad debe ser válida")
    .isLength({ min: 1 })
    .withMessage("LA unidad de material es obligatorio"),
];

//? NOTA EXPLICATORIA DE LA VALIDACIÓN DEL ARRAY DE OBJETOS.
//* 'workforce.*.workforce':
//* workforce: ESTE ES EL NOMBRE DEL CAMPO DE LA SOLICITUD QUE SE ESPERA QUE SEA UN ARRAY.
//* "*": EL ASTERISCO ES UN COMODÍN QUE REPRESENTA A LA ITERACIÓN DE CADA ELEMENTO DEL ARRAY O ÍNDICE
//* workforce: ESTE ES EL NOMBRE DEL CAMPO QUE SE VA A EVALUAR EN CADA ELEMENTO O ÍNDICE (*).
//*  LO MISMO APLICA PARA EL ARRAY DE MATERIALES