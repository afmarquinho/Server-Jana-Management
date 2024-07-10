import { body } from "express-validator";

export const userValidationSchema = [
  body("name")
    .isString()
    .withMessage("El nombre debe ser letras")
    .notEmpty()
    .withMessage("El nombre no puede estar vacío")
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/)
    .withMessage(
      "El nombre solo puede contener letras, espacios y caracteres especiales del español"
    ),

  body("lastName")
    .isString()
    .withMessage("El apellido debe ser letras")
    .notEmpty()
    .withMessage("El apellido no puede estar vacío")
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/)
    .withMessage(
      "El apellido solo puede contener letras, espacios y caracteres especiales del español"
    ),
  body("idType")
    .isIn(["cc", "passport", "ce"])
    .withMessage("Seleccione un tipo de identificación de la lista")
    .notEmpty()
    .withMessage("Seleccione un tipo de identificación de la lista"),

  body("ID")
    .isNumeric()
    .withMessage("La identificación debe ser un número válido")
    .notEmpty()
    .withMessage("La identificación no puede estar vacía"),

  body("dateOfBirth")
    .notEmpty()
    .withMessage("La fecha de nacimiento no puede estar vacía")
    .isISO8601()
    .withMessage(
      "La fecha de nacimiento debe tener un formato válido (ISO 8601)"
    )
    .custom((value) => {
      const today = new Date();
      const birthDate = new Date(value);
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age >= 18;
    })
    .withMessage("El usuario debe tener al menos 18 años"),

  body("address")
    .isString()
    .withMessage("Ingrese una dirección válida")
    .notEmpty()
    .withMessage("El campo 'dirección' no puede estar vacío"),

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

  body("jobTitle")
    .isIn(["gerente", "ing cotizacion", "ing obra", "administrador"])
    .withMessage("Seleccione un cargo de la lista")
    .notEmpty()
    .withMessage("Seleccione un cargo válido"),

  body("user")
    .isString()
    .withMessage("Ingrese una usuario válido")
    .notEmpty()
    .withMessage("El campo 'usuario' no puede estar vacío"),

  body("password")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres")
    .matches(/[A-Z]/)
    .withMessage("La contraseña debe contener al menos una letra mayúscula")
    .matches(/[a-z]/)
    .withMessage("La contraseña debe contener al menos una letra minúscula")
    .matches(/[0-9]/)
    .withMessage("La contraseña debe contener al menos un número")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("La contraseña debe contener al menos un carácter especial"),
];
