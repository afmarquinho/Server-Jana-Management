import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.model";
import { UserTokenType } from "../types/types";

//* escribir en el requireuest para no hacer una llamado a la bbdd nuevamente
declare global {
  namespace Express {
    interface Request {
      user?: UserTokenType;
    }
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bearer = req.headers.authorization;
  if (!bearer) {
    const error = new Error("No autortizado");
    return res.status(401).json({ error: error.message });
  }
  const [, token] = bearer.split(" ");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (typeof decoded === "object" && decoded.id) {
      const user = await User.findByPk(decoded.id, {
        attributes: {
          exclude: [
            "password",
            "createdAt",
            "updatedAt",
            "idType",
            "userNo",
            "dateOfBirth",
            "address",
            "phoneNumber",
            "email",
            "jobTitle",
          ],
        },
      });
      const plainUser = user.get({ plain: true });
      if (plainUser) {
        req.user = plainUser;
      } else {
        res.status(500).json({ error: "Tóken no válido" });
      }
    }
  } catch (error) {
    res.status(500).json({ error: "Tóken no válido" });
    return;
  }

  next();
};

//! IMPORTANTE: ESTE MIDDLEWARE SE ENCARGA DE VALIDAR QUE EL TOKEN SEA VÁLIDO Y QUE EL USUARIO EXISTA
