import { Router } from "express";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  login,
  updatePassword,
  updateUserProfile,
  updateUserStatus,
} from "../handlers/userController";
import handleInputErros from "../middlewares/handleInputErros";
import { userValidationSchema } from "../middlewares/userValidationSchema";
import { passwordValidationSchema } from "../middlewares/passwordValidationSchema";
import { authValidationSchema } from "../middlewares/authValidatonSchema";
import { authenticate } from "../middlewares/auth";
import { param } from "express-validator";
import { statusValidationSchema } from "../middlewares/statusValidationSchema";

const router = Router();

/**
 * @swagger
 * components:
 *    schemas:
 *      User:
 *        type: object
 *        properties:
 *          id:
 *            type: integer
 *            description: The user Id in data base
 *            example: 1
 *          name:
 *            type: string
 *            description: User´s name
 *            example: Juan
 *          lastName:
 *            type: string
 *            description: User´s last name
 *            example: Pérez
 *          idType:
 *            type: string
 *            description: cc, passport, ce
 *            example: cc
 *          userId:
 *            type: integer
 *            description: User´s id
 *            example: 123456789
 *          dateOfBirth:
 *            type: Date
 *            description: User´s b-day
 *            example: 1990-04-01
 *          address:
 *            type: string
 *            description: User´s address
 *            example: Cra 29-28# 25c
 *          phoneNumber:
 *            type: string
 *            description: User´s phonnumber
 *            example: +254712471
 *          email:
 *            type: string
 *            description: email
 *            example: exmple@example.com
 *          role:
 *            type: string
 *            description: gerente, ingCotizacion, ingObra, admin
 *            example: gerente
 *          jobTitle:
 *            type: string
 *            description: Position
 *            example: Inspector
 *          profilePicture:
 *            type: string
 *            description: Profile picture route
 *            example: /upload/1235.juan.jpg
 *          user:
 *            type: string
 *            description: user
 *            example: juan.perez
 *          password:
 *            type: string
 *            description: User´s password
 *            example: securePassword123@
 *          active:
 *            type: boolean
 *            description: To show if user is active in the system
 *            example: true *
 */

//! IMPORTANTE HABILTAR EL AUTHENTICATE EN EL POST DE CREAR USUARIO, LO DESACTIVÉ PARA PODER TESTEAR EL ENDPOINT

//* ROUTING

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     description: Creates a new user with the provided data and returns the newly created user data.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Juan"
 *               lastName:
 *                 type: string
 *                 example: "Pérez"
 *               idType:
 *                 type: string
 *                 enum: ["cc", "passport", "ce"]
 *                 example: "cc"
 *               userId:
 *                 type: integer
 *                 example: 123456789
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *                 example: "1990-01-01"
 *               address:
 *                 type: string
 *                 example: "123 Main St"
 *               phoneNumber:
 *                 type: string
 *                 example: "+1234567890"
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               role:
 *                 type: string
 *                 enum: ["gerente", "ingCotizacion", "ingObra", "admin"]
 *                 example: "admin"
 *               jobTitle:
 *                 type: string
 *                 example: "Software Developer"
 *               profilePicture:
 *                 type: string
 *                 example: "profilepic.jpg"
 *               user:
 *                 type: string
 *                 example: "juanperez"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       201:
 *         description: User created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Juan"
 *                     lastName:
 *                       type: string
 *                       example: "Pérez"
 *                     idType:
 *                       type: string
 *                       enum: ["cc", "passport", "ce"]
 *                       example: "cc"
 *                     userId:
 *                       type: integer
 *                       example: 123456789
 *                     dateOfBirth:
 *                       type: string
 *                       format: date
 *                       example: "1990-01-01"
 *                     address:
 *                       type: string
 *                       example: "123 Main St"
 *                     phoneNumber:
 *                       type: string
 *                       example: "+1234567890"
 *                     email:
 *                       type: string
 *                       example: "user@example.com"
 *                     role:
 *                       type: string
 *                       enum: ["gerente", "ingCotizacion", "ingObra", "admin"]
 *                       example: "admin"
 *                     jobTitle:
 *                       type: string
 *                       example: "Software Developer"
 *                     profilePicture:
 *                       type: string
 *                       example: "profilepic.jpg"
 *                     user:
 *                       type: string
 *                       example: "juanperez"
 *       400:
 *         description: Invalid input data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid input data"
 *       500:
 *         description: Error creating user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error creating user"
 */

router.post(
  "/",

  userValidationSchema,
  handleInputErros,
  createUser
);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: User login
 *     description: Authenticates a user based on the provided email and password, and returns a JWT token along with user data.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Successful authentication, returns user data and JWT token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     user:
 *                       type: string
 *                       example: "juanperez"
 *                     name:
 *                       type: string
 *                       example: "Juan"
 *                     lastName:
 *                       type: string
 *                       example: "Pérez"
 *                     active:
 *                       type: boolean
 *                       example: true
 *                     role:
 *                       type: string
 *                       enum: ["gerente", "ingCotizacion", "ingObra", "admin"]
 *                       example: "admin"
 *                     profilePicture:
 *                       type: string
 *                       example: "profilepic.jpg"
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4iLCJpYXQiOjE1MTYyMzkwMjJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
 *       401:
 *         description: Invalid credentials provided.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid access, check email and password"
 *       500:
 *         description: Error during authentication.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Authentication error"
 */

router.post("/login", authValidationSchema, handleInputErros, login);

/**
 * @swagger
 * /api/users:
 *      get:
 *          summary: Get a list of users.
 *          tags:
 *              - Users
 *          description: Return a list of users registers in data base.
 *          responses:
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                               type: array
 *                               items:
 *                                    $ref: "#/components/schemas/User"
 */
router.get(
  "/",
  //authenticate,
  getUsers
);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get an user by Id.
 *     description: Retrun a specific user data according to a given Id.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User Id to obtain.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful Response => Usuario encontrado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Juan"
 *                     lastName:
 *                       type: string
 *                       example: "Pérez"
 *                     idType:
 *                       type: string
 *                       enum: ["cc", "passport", "ce"]
 *                       example: "cc"
 *                     userId:
 *                       type: integer
 *                       example: 12345678
 *                     dateOfBirth:
 *                       type: string
 *                       format: date
 *                       example: "1980-01-01"
 *                     address:
 *                       type: string
 *                       example: "Calle Falsa 123"
 *                     phoneNumber:
 *                       type: string
 *                       example: "+34123456789"
 *                     email:
 *                       type: string
 *                       example: "juan.perez@example.com"
 *                     role:
 *                       type: string
 *                       enum: ["gerente", "ingCotizacion", "ingObra", "admin"]
 *                       example: "ingObra"
 *                     jobTitle:
 *                       type: string
 *                       example: "Desarrollador"
 *                     profilePicture:
 *                       type: string
 *                       example: "profilepic.jpg"
 *                     user:
 *                       type: string
 *                       example: "juanperez"
 *                     active:
 *                       type: boolean
 *                       example: true
 *       404:
 *         description: Not found user => Usuario no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Usuario no encontrado"
 *       500:
 *         description: Error to get User => Error al obtener el usuario.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error al obtener usuario"
 */

router.get(
  "/:id",
  authenticate,
  param("id").isInt().withMessage("Id no válido"),
  handleInputErros,
  getUserById
);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update an existing user.
 *     description: Update the information of a specific user based on the provided ID.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to update.
 *         schema:
 *           type: integer
 *       - in: body
 *         name: user
 *         description: Object containing the data of the user to update.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               example: "Juan"
 *             lastName:
 *               type: string
 *               example: "Pérez"
 *             idType:
 *               type: string
 *               enum: ["cc", "passport", "ce"]
 *               example: "cc"
 *             userId:
 *               type: integer
 *               example: 12345678
 *             dateOfBirth:
 *               type: string
 *               format: date
 *               example: "1980-01-01"
 *             address:
 *               type: string
 *               example: "Calle Falsa 123"
 *             phoneNumber:
 *               type: string
 *               example: "+34123456789"
 *             email:
 *               type: string
 *               example: "juan.perez@example.com"
 *             role:
 *               type: string
 *               enum: ["gerente", "ingCotizacion", "ingObra", "admin"]
 *               example: "ingObra"
 *             jobTitle:
 *               type: string
 *               example: "Desarrollador"
 *             profilePicture:
 *               type: string
 *               example: "profilepic.jpg"
 *             user:
 *               type: string
 *               example: "juanperez"
 *             password:
 *               type: string
 *               example: "password123"
 *             active:
 *               type: boolean
 *               example: true
 *     responses:
 *       200:
 *         description: User updated successfully => Usuario actualizado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Juan"
 *                     lastName:
 *                       type: string
 *                       example: "Pérez"
 *                     idType:
 *                       type: string
 *                       enum: ["cc", "passport", "ce"]
 *                       example: "cc"
 *                     userId:
 *                       type: integer
 *                       example: 12345678
 *                     dateOfBirth:
 *                       type: string
 *                       format: date
 *                       example: "1980-01-01"
 *                     address:
 *                       type: string
 *                       example: "Calle Falsa 123"
 *                     phoneNumber:
 *                       type: string
 *                       example: "+34123456789"
 *                     email:
 *                       type: string
 *                       example: "juan.perez@example.com"
 *                     role:
 *                       type: string
 *                       enum: ["gerente", "ingCotizacion", "ingObra", "admin"]
 *                       example: "ingObra"
 *                     jobTitle:
 *                       type: string
 *                       example: "Desarrollador"
 *                     profilePicture:
 *                       type: string
 *                       example: "profilepic.jpg"
 *                     user:
 *                       type: string
 *                       example: "juanperez"
 *                     active:
 *                       type: boolean
 *                       example: true
 *       400:
 *         description: Input validation error => Error de validación de entrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Id no válido"
 *       404:
 *         description: User not found => Usuario no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Usuario no encontrado"
 *       500:
 *         description: Error updating the user => Error al actualizar el usuario.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error al actualizar el usuario"
 */

router.put(
  "/:id",
  authenticate,
  param("id").isInt().withMessage("Id no válido"),
  userValidationSchema,
  handleInputErros,
  updateUser
);

/**
 * @swagger
 * /api/users/{id}:
 *   patch:
 *     summary: Update user password
 *     description: Updates the password of a specific user based on the provided ID.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user whose password will be updated.
 *         schema:
 *           type: integer
 *       - in: body
 *         name: password
 *         description: New password for the user.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             password:
 *               type: string
 *               example: "newpassword123"
 *     responses:
 *       200:
 *         description: Password updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Password updated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Juan"
 *                     lastName:
 *                       type: string
 *                       example: "Pérez"
 *                     idType:
 *                       type: string
 *                       enum: ["cc", "passport", "ce"]
 *                       example: "cc"
 *                     userId:
 *                       type: integer
 *                       example: 12345678
 *                     dateOfBirth:
 *                       type: string
 *                       format: date
 *                       example: "1980-01-01"
 *                     address:
 *                       type: string
 *                       example: "Calle Falsa 123"
 *                     phoneNumber:
 *                       type: string
 *                       example: "+34123456789"
 *                     email:
 *                       type: string
 *                       example: "juan.perez@example.com"
 *                     role:
 *                       type: string
 *                       enum: ["gerente", "ingCotizacion", "ingObra", "admin"]
 *                       example: "ingObra"
 *                     jobTitle:
 *                       type: string
 *                       example: "Developer"
 *                     profilePicture:
 *                       type: string
 *                       example: "profilepic.jpg"
 *                     user:
 *                       type: string
 *                       example: "juanperez"
 *                     active:
 *                       type: boolean
 *                       example: true
 *       400:
 *         description: Validation error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid ID"
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User not found"
 *       500:
 *         description: Error updating password.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error updating password"
 */

router.patch(
  "/:id",
  authenticate,
  param("id").isInt().withMessage("Id no válido"),
  passwordValidationSchema,
  handleInputErros,
  updatePassword
);

/**
 * @swagger
 * /api/users/update/{id}:
 *   patch:
 *     summary: Update user profile
 *     description: Updates the profile of a specific user based on the provided ID.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user whose profile will be updated.
 *         schema:
 *           type: integer
 *       - in: body
 *         name: user
 *         description: Object containing the updated user information.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               example: "Juan"
 *             lastName:
 *               type: string
 *               example: "Pérez"
 *             idType:
 *               type: string
 *               enum: ["cc", "passport", "ce"]
 *               example: "cc"
 *             userId:
 *               type: integer
 *               example: 12345678
 *             dateOfBirth:
 *               type: string
 *               format: date
 *               example: "1980-01-01"
 *             address:
 *               type: string
 *               example: "Calle Falsa 123"
 *             phoneNumber:
 *               type: string
 *               example: "+34123456789"
 *             email:
 *               type: string
 *               example: "juan.perez@example.com"
 *             role:
 *               type: string
 *               enum: ["gerente", "ingCotizacion", "ingObra", "admin"]
 *               example: "ingObra"
 *             jobTitle:
 *               type: string
 *               example: "Developer"
 *             profilePicture:
 *               type: string
 *               example: "profilepic.jpg"
 *             user:
 *               type: string
 *               example: "juanperez"
 *             password:
 *               type: string
 *               example: "newpassword123"
 *             active:
 *               type: boolean
 *               example: true
 *     responses:
 *       200:
 *         description: User profile updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User updated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Juan"
 *                     lastName:
 *                       type: string
 *                       example: "Pérez"
 *                     idType:
 *                       type: string
 *                       enum: ["cc", "passport", "ce"]
 *                       example: "cc"
 *                     userId:
 *                       type: integer
 *                       example: 12345678
 *                     dateOfBirth:
 *                       type: string
 *                       format: date
 *                       example: "1980-01-01"
 *                     address:
 *                       type: string
 *                       example: "Calle Falsa 123"
 *                     phoneNumber:
 *                       type: string
 *                       example: "+34123456789"
 *                     email:
 *                       type: string
 *                       example: "juan.perez@example.com"
 *                     role:
 *                       type: string
 *                       enum: ["gerente", "ingCotizacion", "ingObra", "admin"]
 *                       example: "ingObra"
 *                     jobTitle:
 *                       type: string
 *                       example: "Developer"
 *                     profilePicture:
 *                       type: string
 *                       example: "profilepic.jpg"
 *                     user:
 *                       type: string
 *                       example: "juanperez"
 *                     active:
 *                       type: boolean
 *                       example: true
 *       400:
 *         description: Validation error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid ID"
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User not found"
 *       500:
 *         description: Error updating user profile.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error updating user profile"
 */

router.patch(
  "/update/:id",
  authenticate,
  param("id").isInt().withMessage("Id no válido"),
  updateUserProfile
);

/**
 * @swagger
 * /api/users/update-status/{id}:
 *   patch:
 *     summary: Update user status
 *     description: Updates the status (active/inactive) of a specific user based on the provided ID.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user whose status will be updated.
 *         schema:
 *           type: integer
 *       - in: body
 *         name: status
 *         description: Object containing the updated status of the user.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             active:
 *               type: boolean
 *               example: true
 *     responses:
 *       200:
 *         description: User status updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Status updated successfully"
 *       400:
 *         description: Validation error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid ID"
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User not found"
 *       500:
 *         description: Error updating user status.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error updating status"
 */

router.patch(
  "/update-status/:id",
  authenticate,
  param("id").isInt().withMessage("Id no válido"),
  statusValidationSchema,
  handleInputErros,
  updateUserStatus
);

/**
 * @swagger
 * /api/users/restore-session:
 *   post:
 *     summary: Restore user session
 *     description: Restores the user session and returns user information based on the JWT token.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User session restored successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Juan"
 *                     lastName:
 *                       type: string
 *                       example: "Pérez"
 *                     idType:
 *                       type: string
 *                       enum: ["cc", "passport", "ce"]
 *                       example: "cc"
 *                     userId:
 *                       type: integer
 *                       example: 12345678
 *                     dateOfBirth:
 *                       type: string
 *                       format: date
 *                       example: "1980-01-01"
 *                     address:
 *                       type: string
 *                       example: "Calle Falsa 123"
 *                     phoneNumber:
 *                       type: string
 *                       example: "+34123456789"
 *                     email:
 *                       type: string
 *                       example: "juan.perez@example.com"
 *                     role:
 *                       type: string
 *                       enum: ["gerente", "ingCotizacion", "ingObra", "admin"]
 *                       example: "ingObra"
 *                     jobTitle:
 *                       type: string
 *                       example: "Developer"
 *                     profilePicture:
 *                       type: string
 *                       example: "profilepic.jpg"
 *                     user:
 *                       type: string
 *                       example: "juanperez"
 *                     active:
 *                       type: boolean
 *                       example: true
 *       401:
 *         description: Unauthorized. User must be authenticated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized"
 *       500:
 *         description: Error restoring user session.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error restoring session"
 */

router.post("/restore-session", authenticate, (req, res) => {
  res.status(200).json({ data: req.user });
});

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete user
 *     description: Deletes a specific user based on the provided ID.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to be deleted.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: string
 *                   example: "User deleted successfully"
 *       400:
 *         description: Validation error, such as an invalid ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid ID"
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User not found"
 *       500:
 *         description: Error deleting user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error deleting user"
 */

router.delete(
  "/:id",
  authenticate,
  param("id").isInt().withMessage("Id no válido"),
  deleteUser
);

export default router;
