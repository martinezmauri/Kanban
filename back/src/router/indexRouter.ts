import { Router } from "express";
import userRouter from "./usersRouter";
import Taskrouter from "./tasksRouter";

const router: Router = Router();

router.use("/users", userRouter);

router.use("/tasks", Taskrouter);

export default router;
