import { Router } from "express";
import {
  addUser,
  getUser,
  getUserById,
  loginUser,
} from "../controllers/userController";
import {
  validateUserData,
  validateUserLogin,
  validateUsernameUnique,
} from "../middlewares/userMiddleware";
import { validateUUID } from "../middlewares/idMiddleware";

const userRouter: Router = Router();

userRouter.get("/", getUser);

userRouter.get("/:id", validateUUID, getUserById);

userRouter.post("/register", validateUserData, validateUsernameUnique, addUser);

userRouter.post("/login", validateUserLogin, loginUser);

export default userRouter;
