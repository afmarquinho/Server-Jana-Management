import { Request, Response } from "express";
import User from "../models/User.model";
import bcrypt from "bcryptjs";

//TODO: CREAR EL CONTROLADOR PARA ACTUALIZAR LA CONTRASEÑA

//? CREATE USER
export const createUser = async (req: Request, res: Response) => {
  const user = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;

    const newUser = await User.create(user);
    res.status(201).json({ data: newUser });
  } catch (error) {
    console.error("Error al crear el usuario:", error.message);
    res.status(500).json({ error: "Error al crear el usuario" });
  }
};

//? GET USERS
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

//? GET USER
export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id, {
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    if (!user) {
      console.error("Usuario no encontrado");
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.status(200).json({ data: user });
  } catch (error) {
    console.error("Error al obtener la buscar usuario:", error.message);
    const err = new Error("Error al obtener la buscar usuario");
    res.status(500).json({ error: err.message });
  }
};

//? UPDATE USER
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

//? UPDATE PASSWORD
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
  res.status(200).json({ message: "Contraseña actualizada correctamente" });

 } catch (error) {
  console.error("Error al actualizar la contraseña:", error.message);
  const err = new Error("Error al actualizar la contraseña");
  res.status(500).json({ error: err.message });
 }

}


//? DELETE USER

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

//? AUTHENTICATON
export const authenticate = async (req: Request, res: Response) => {
  const { user, password } = req.body;

  if (!user || !password) {
    return res
      .status(400)
      .json({ error: "Usuario y contraseña son requeridos" });
  }

  try {
    const foundUser = await User.findOne({ where: { user } });

    if (!foundUser) {
      return res.status(404).json({ error: "Usuario no registrado" });
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      foundUser.dataValues.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    res.json({ data: foundUser });
  } catch (error) {
    console.error("Error en la autenticación:", error);
    res.status(500).json({ error: "Error en la autenticación" });
  }
};
