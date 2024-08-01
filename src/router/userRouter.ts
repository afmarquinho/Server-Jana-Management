import { Router } from "express";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  authenticate,
  updatePassword,
  updateUserProfile,
  updateUserStatus,
} from "../handlers/user";
import { param } from "express-validator";
import handleInputErros from "../middlewares/handleInputErros";
import { userValidationSchema } from "../middlewares/userValidationSchema";
import { passwordValidationSchema } from "../middlewares/passwordValidationSchema";

const router = Router();

//* ROUTING

router.get("/", getUsers);
router.get("/:id", getUserById);

router.post("/", userValidationSchema, handleInputErros, createUser);
router.put("/:id", userValidationSchema, handleInputErros, updateUser);

router.patch(
  "/:id",
  passwordValidationSchema,
  handleInputErros,
  updatePassword
);

router.patch("/update/:id", updateUserProfile);
router.patch("/update-status/:id", updateUserStatus);

router.post("/login", authenticate);

router.delete("/:id", deleteUser);

export default router;
