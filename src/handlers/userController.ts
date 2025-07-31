import { Request, Response } from "express";
import User from "../models/User.model";
import bcrypt from "bcryptjs";
import { generateJWT } from "../utils/jwt";
import { UserTokenType } from "../types/types";

//TODO: CREAR EL CONTROLADOR PARA ACTUALIZAR LA CONTRASEÑA

//* CREATE USER
export const createUser = async (req: Request, res: Response) => {
  const user = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(user.password, salt);
  user.password = hashedPassword;

  const newUser = await User.create(user);
  const getUser = await User.findByPk(newUser.dataValues.id, {
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });
  res.status(201).json({ data: getUser });
};

//* GET USERS
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    if (users.length === 0) {
      console.error("No se encontraron usuarios");
      return res.status(404).json({ error: "No se encontraron usuarios" });
    }
    res.status(200).json({ data: users });
  } catch (error) {
    console.error("Error al obtener usuarios:", error.message);
    const err = new Error("Error al obtender usuarios");
    res.status(500).json({ error: err.message });
  }
};

//* GET USER BY ID
export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id, {
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.status(200).json({ data: user });
  } catch (error) {
    console.error("Error al obtener usuario:", error.message);
    const err = new Error("Error al obtener usuario");
    res.status(500).json({ error: err.message });
  }
};

//* UPDATE USER
export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userData = req.body;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      console.error("Usuario no encontrado");
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);
    userData.password = hashedPassword;

    await user.update(userData);
    const updatedUser = await User.findByPk(id, {
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    res.status(200).json({ data: updatedUser });
  } catch (error) {
    console.error("Error al actualizar el usuario:", error.message);
    const err = new Error("Error al actualizar el usuario");
    res.status(500).json({ error: err.message });
  }
};

//* UPDATE PASSWORD -PATCH
export const updatePassword = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await user.update({ password: hashedPassword });

    const updatedUser = await User.findByPk(id, {
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.status(200).json({
      message: "Contraseña actualizada correctamente",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error al actualizar la contraseña:", error.message);
    const err = new Error("Error al actualizar la contraseña");
    res.status(500).json({ error: err.message });
  }
};

//* UPDATE USERPROFILE -PATCH
export const updateUserProfile = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const userToUpdate = await User.findByPk(id);
    if (!userToUpdate) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    await userToUpdate.update(req.body);

    const getUser = await User.findByPk(id, {
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res
      .status(200)
      .json({ message: "Usuario actualizado correctamente", data: getUser });
  } catch (error) {
    console.error("Error al actualizar el usuario:", error.message);
    const err = new Error("Error al actualizar el usuario");
    res.status(500).json({ error: err.message });
  }
};

//* DELETE USER

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      console.error("Usuario no encontrado");
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    await user.destroy();
    res.status(200).json({
      data: "Usuario eliminado correctamente",
    });
  } catch (error) {
    console.error("Error al eliminar el usuario:", error.message);
    const err = new Error("Error al eliminar el usuario");
    res.status(500).json({ error: err.message });
  }
};

//* AUTHENTICATON
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res
        .status(404)
        .json({ error: "Acceso inválido, revise el email y contraseña" });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.dataValues.password
    );

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ error: "Acceso inválido, revise el email y contraseña" });
    }
    const plainUser = user.get({ plain: true });

    const payload = {
      id: plainUser.id,
      user: plainUser.user,
      name: plainUser.name,
      lastName: plainUser.lastName,
      active: plainUser.active,
      role: plainUser.role,
      profilePicture: plainUser.profilePicture,
      jobTitle: plainUser.jobTitle,
    };


    const token = generateJWT(payload);

    res.status(200).json({
      data: payload,
      token,
    });
  } catch (error) {
    console.error("Error en la autenticación:", error);
    res.status(500).json({ error: "Error en la autenticación" });
  }
};

//* UPDATE STATUS -PATCH
export const updateUserStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { active } = req.body;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    await user.update({ active });

    res.status(200).json({ message: "Estado actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar el estado:", error.message);
    const err = new Error("Error al actualizar el estado");
    res.status(500).json({ error: err.message });
  }
};
