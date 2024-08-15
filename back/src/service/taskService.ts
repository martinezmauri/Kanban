import { TaskDto } from "../dtos/taskDto";
import { Status } from "../entities/Status";
import { Task } from "../entities/Task";
import { CustomError } from "../handlers/CustomError";
import statusRepository from "../Repositories/StatusRepository";
import taskRepository from "../Repositories/TaskRepository";
import userRepository from "../Repositories/UserRepository";

export const getTaskService = async (): Promise<Task[]> => {
  try {
    const tasks = await taskRepository.find({
      relations: ["status", "assignedUser"],
    });
    return tasks;
  } catch (error) {
    console.log("Error obteniendo las tareas", error);
    throw new Error("Failed to search tasks");
  }
};

export const getTaskByIdService = async (id: string): Promise<Task | null> => {
  try {
    const task = await taskRepository.findOne({
      where: { id },
      relations: ["assignedUser", "status"],
    });
    return task;
  } catch (error) {
    console.log("Error obteniendo la tarea", error);
    throw new Error("Failed to search task");
  }
};

export const getTaskByUserIdService = async (
  userId: string
): Promise<Task[] | undefined> => {
  try {
    const tasks = await taskRepository.find({
      where: { assignedUser: { id: userId } },
      relations: ["status"],
    });
    return tasks;
  } catch (error) {
    console.error("Error obteniendo tareas de usuario por id");
    throw new Error("Failed to search tasks");
  }
};

export const addTaskService = async (taskDto: TaskDto): Promise<void> => {
  try {
    const user = await userRepository.findOne({
      where: { id: taskDto.assignedUserId },
    });
    if (!user) throw new CustomError("Usuario no encontrado");

    const status = await statusRepository.findOne({
      where: { status: taskDto.status },
    });
    if (status) {
      const newTask = new Task();
      newTask.title = taskDto.title;
      newTask.description = taskDto.description;
      newTask.color = taskDto.color;
      newTask.createdAt = new Date();
      newTask.updateAt = new Date();
      newTask.assignedUser = user;
      newTask.status = status;
      await taskRepository.save(newTask);
    } else {
      throw new Error("status null");
    }
  } catch (error) {
    console.log("Error creando tarea", error);
    throw new Error("Failed to create task");
  }
};

export const modifyTaskStatusService = async (
  taskId: string,
  status: string
): Promise<Task> => {
  try {
    const task = await taskRepository.findOneOrFail({ where: { id: taskId } });
    status = status.toLocaleUpperCase();
    const newStatus = await statusRepository.findOneOrFail({
      where: { status },
    });
    task.status = newStatus;
    await taskRepository.save(task);
    return task;
  } catch (error) {
    console.log("Error modificando tarea", error);
    throw new Error("Failed to modify task");
  }
};
