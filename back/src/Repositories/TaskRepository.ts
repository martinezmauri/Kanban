import { AppDataSource } from "../config/data-source";
import { Task } from "../entities/Task";

const taskRepository = AppDataSource.getRepository(Task);

export default taskRepository;
