import { Request, Response, NextFunction } from "express";
import { isUUID } from "validator";

export const validateUUID = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  if (!isUUID(id)) {
    return res.status(400).json({ message: "Formato de id incorrecto." });
  }
  next();
};
