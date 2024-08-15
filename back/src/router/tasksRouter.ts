import { Router } from "express";
import {
  addTask,
  getTaskById,
  getTaskByUserId,
  getTasks,
  modifyTaskStatus,
} from "../controllers/taskController";
import {
  validateModifyTask,
  validateStatusValues,
  validateTaskData,
} from "../middlewares/taskMiddleware";
import { validateUUID } from "../middlewares/idMiddleware";

const Taskrouter: Router = Router();

Taskrouter.get("/", getTasks);

/* Taskrouter.get("/:id", validateUUID, getTaskById); */
Taskrouter.get("/:id", validateUUID, getTaskByUserId);

Taskrouter.post("/addTask", validateTaskData, addTask);

Taskrouter.put(
  "/changeStatus/:id",
  validateUUID,
  validateModifyTask,
  validateStatusValues,
  modifyTaskStatus
);

export default Taskrouter;
