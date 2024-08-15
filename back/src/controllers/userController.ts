import { Request, Response } from "express";
import {
  addUserService,
  getUserByIdService,
  getUserService,
} from "../service/userService";
import { UserDto } from "../dtos/userDto";
import { verifyCredentialService } from "../service/credentialService";

export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await getUserService();
    if (users) res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo usuarios ", error });
  }
};

export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const user = await getUserByIdService(id);
    if (user != null) res.status(200).json(user);
    else
      res
        .status(404)
        .json({ message: "No hay un usuario registrado con ese id" });
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo usuario", error });
  }
};

export const addUser = async (req: Request, res: Response): Promise<void> => {
  const { name, email, birthdate, username, password } = req.body;

  try {
    const dateNow = new Date();
    const userDto: UserDto = {
      name,
      email,
      birthdate,
      createdAt: dateNow,
      updatedAt: dateNow,
    };
    await addUserService(userDto, username, password);
    res.status(201).json({ message: "Usuario registrado correctamente" });
  } catch (error) {
    res.status(400).json({ message: "Error. Los datos son incorrectos" });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  try {
    const user = await verifyCredentialService(username, password);

    if (user) {
      res.status(200).json({
        login: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          birthdate: user.birthdate,
          createdAt: user.createdAt,
          updateAt: user.updatedAt,
          avatar: user.avatar.url,
        },
      });
    } else {
      res
        .status(400)
        .json({ message: "Nombre de usuario y/o contraseña incorrecta" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error iniciando sesion ", error });
  }
};
