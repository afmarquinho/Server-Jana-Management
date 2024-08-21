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
import { param } from "express-validator";
import handleInputErros from "../middlewares/handleInputErros";
import { userValidationSchema } from "../middlewares/userValidationSchema";
import { passwordValidationSchema } from "../middlewares/passwordValidationSchema";
import { authValidationSchema } from "../middlewares/authValidatonSchema";
import { authenticate } from "../middlewares/auth";

const router = Router();

//* ROUTING

router.get("/", authenticate, getUsers);
router.get("/:id", authenticate, getUserById);

router.post(
  "/",
  authenticate,
  userValidationSchema,
  handleInputErros,
  createUser
);
router.put(
  "/:id",
  authenticate,
  userValidationSchema,
  handleInputErros,
  updateUser
);

router.patch(
  "/:id",
  authenticate,
  passwordValidationSchema,
  handleInputErros,
  updatePassword
);

router.patch("/update/:id", authenticate, updateUserProfile);
router.patch("/update-status/:id", authenticate, updateUserStatus);

router.post("/login", authValidationSchema, handleInputErros, login);
router.post("/restore-session", authenticate, (req, res) => {
  res.status(200).json({ data: req.user });
});

router.delete("/:id", authenticate, deleteUser);

export default router;
