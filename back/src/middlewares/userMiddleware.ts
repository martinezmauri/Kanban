import { Request, Response, NextFunction } from "express";
import credentialRepository from "../Repositories/CredentialRepository";

export const validateUserData = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, birthdate, username, password } = req.body;
  if (!name || !email || !username || !password || !birthdate) {
    return res.status(400).json({ message: "Faltan datos" });
  }
  next();
};

export const validateUserLogin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Faltan datos" });
  }
  next();
};

export const validateUsernameUnique = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username } = req.body;
  try {
    const existing = await credentialRepository.findOne({
      where: { username },
    });
    if (existing) {
      return res
        .status(409)
        .json({ message: "El nombre de usuario ya esta en uso" });
    }
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error al validar el nombre de usuario" });
  }
};
