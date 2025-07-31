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

  //   body("visitDate")
  //   .isDate() //? isISO8601 tambien se puede usar para validar de manera mas estricta este formato
  //   .withMessage("Digite una fecha válida")
  //   .notEmpty()
  //   .withMessage("La fecha de vista no puede estar vacía")
  //   .custom((value) => {
  //     const today: Date = new Date();
  //     const visitDate: Date = new Date(value);
  //     return visitDate <= today;
  //   })
  //   .withMessage("Digite una fecha válida"),

  //   body("name")
  //   .isString()
  //   .withMessage("El nombre de la cotización debe ser válido")
  //   .notEmpty()
  //   .withMessage("El nombre de la cotización no debe estar vacío"),

  // body("customerName")
  //   .isString()
  //   .withMessage("Digite un nombre de cliente válido")
  //   .notEmpty()
  //   .withMessage("Nombre del cliente no puede estar vacío"),

  // body("customerCity")
  //   .isString()
  //   .withMessage("Ciudad debe ser válida")
  //   .notEmpty()
  //   .withMessage("El campo ciudad no puede estar vacío"),
];

// {
//     "visitDate": "2024-06-15",
//     "name": "Mantenimiento de Sistemas de Control",
//     "customerName": "Tumaco",
//     "nit": 678912345,
//     "ref": "TUM-2024-014",
//     "city": "12458",
//     "address": "Avenida Principal #123",
//     "contactName": "Miguel Salazar",
//     "phoneNumber": "555-7891234",
//     "email": "miguel.salazar@tumaco.com",
//     "dueDate": "2024-12-01",
//     "priority": "medium",
//     "description": "Mantenimiento y calibración de sistemas de control de procesos.",
//     "workforce": [
//       {
//         "workforce": "Ingeniero de Control",
//         "workshift": 4
//       },
//       {
//         "workforce": "Técnico en Instrumentación",
//         "workshift": 3
//       }
//     ],
//     "material": [
//       {
//         "material": "Sensores",
//         "quantity": 30,
//         "unit": "unidades"
//       },
//       {
//         "material": "Controladores",
//         "quantity": 15,
//         "unit": ""
//       }
//     ]
//   }
