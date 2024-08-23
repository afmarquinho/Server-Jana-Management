import { Request, Response } from "express";
import User from "../models/User.model";
import fs from "node:fs";
import path from "path";

function saveImage(file, userId: number, userName: string) {
  const uniqueSuffix = `${userId}-${userName}`;
  const fileExtension = path.extname(file.originalname);
  const newFileName = `${uniqueSuffix}${fileExtension}`;
  const newPath = `uploads/${newFileName}`;
  fs.renameSync(file.path, newPath);
  return newPath;
}

export const uploadPicture = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      console.error("Usuario no encontrado");
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    if (!req.file) {
      console.error("Archivo no encontrado en la solicitud");
      return res.status(400).json({ error: "Archivo no encontrado" });
    }

    const filePath = saveImage(
      req.file,
      user.dataValues.userId,
      user.dataValues.name
    );
    await user.update({ profilePicture: filePath });
    res.send({ msg: "Archivo subido con éxito", filePath });
  } catch (error) {
    console.error(
      "Error al actualizar la imagen de perfil del usuario:",
      error.message
    );
    res.status(500).send("Error al actualizar la imagen de perfil del usuario");
  }
};

export const getProfilePic = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    // Busca el usuario en la base de datos
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Verifica si el usuario tiene una imagen de perfil
    const profilePicture = user.profilePicture;
    if (!profilePicture) {
      return res.status(404).json({ error: "Imagen de perfil no encontrada" });
    }

    // Devuelve la URL de la imagen de perfil
    res.json({ data: `/api/uploads/${path.basename(profilePicture)}` });
  } catch (error) {
    console.error("Error al obtener la imagen de perfil:", error.mes);
    res.status(500).send("Error al obtener la imagen de perfil");
  }
};
