import { Request, Response } from "express";
import {
  addTaskService,
  getTaskByIdService,
  getTaskByUserIdService,
  getTaskService,
  modifyTaskStatusService,
} from "../service/taskService";
import { TaskDto } from "../dtos/taskDto";
import { CustomError } from "../handlers/CustomError";

export const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const tasks = await getTaskService();
    if (tasks) res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor", error });
  }
};

export const getTaskById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const task = await getTaskByIdService(id);
    if (task) res.status(200).json(task);
    else res.status(404).json({ message: "No existe una tarea con ese id" });
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor ", error });
  }
};

export const getTaskByUserId = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const tasks = await getTaskByUserIdService(id);
    if (tasks) res.status(200).json(tasks);
    else res.status(404).json({ message: "No existe una tarea con ese id" });
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor ", error });
  }
};

export const addTask = async (req: Request, res: Response): Promise<void> => {
  const taskDto: TaskDto = req.body;
  try {
    await addTaskService(taskDto);
    res.status(201).json({ message: "Tarea agregada." });
  } catch (error: any) {
    if (error instanceof CustomError) {
      res.status(400).json({ message: error.message });
    } else {
      res
        .status(500)
        .json({ message: "Error interno del servidor", error: error.message });
    }
  }
};

export const modifyTaskStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = req.params.id;
  const { status } = req.body;
  try {
    const updateTask = await modifyTaskStatusService(id, status);
    res.status(200).json(updateTask);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al actualizar el estado de la tarea ", error });
  }
};
