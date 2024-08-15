import { Request, Response, NextFunction } from "express";
import { TaskDto } from "../dtos/taskDto";
import { isUUID } from "validator";
import statusRepository from "../Repositories/StatusRepository";

export const validateTaskData = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, description, color, assignedUserId, status } =
    req.body as TaskDto;
  if (!title || !description || !color || !assignedUserId || !status) {
    return res.status(400).json({ message: "Faltan datos" });
  }
  if (typeof assignedUserId != "string") {
    return res.status(400).json({ message: "ID invalido" });
  }
  if (!isUUID(assignedUserId)) {
    return res.status(400).json({ message: "Tipo de id no valido" });
  }
  if (typeof status != "string") {
    return res.status(400).json({ message: "Tipo de status incorrecto" });
  }

  next();
};

export const validateModifyTask = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { status } = req.body;
  if (typeof status != "string") {
    return res.status(400).json({ message: "Datos incorrectos" });
  }
  if (
    status.toLocaleUpperCase() !== "PENDING" &&
    status.toLocaleUpperCase() !== "IN PROGRESS" &&
    status.toLocaleUpperCase() !== "COMPLETED"
  ) {
    return res.status(400).json({ message: "Datos incorrectos" });
  }
  next();
};

export const validateStatusValues = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const requiredStatuses = ["PENDING", "IN PROGRESS", "COMPLETED"];

    const statuses = await statusRepository
      .createQueryBuilder("status")
      .where("status.status IN (:...requiredStatuses)", {
        requiredStatuses,
      })
      .getMany();

    const existingStatusNames = statuses.map((status) => status.status);
    const allStatusesExist = requiredStatuses.every((status) =>
      existingStatusNames.includes(status)
    );
    if (!allStatusesExist) {
      return res
        .status(400)
        .json({ message: "La base de datos esta en mantenimiento." });
    }
    next();
  } catch (error: any) {
    return res.status(500).json({
      message: "Error al validar los valores en la tabla status",
      error: error.message,
    });
  }
};
