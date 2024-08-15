import { UserDto } from "../dtos/userDto";
import { User } from "../entities/User";
import credentialRepository from "../Repositories/CredentialRepository";
import userRepository from "../Repositories/UserRepository";
import { addCredentialService } from "./credentialService";
import createAvatar from "./avatarService";

export const getUserService = async (): Promise<User[]> => {
  try {
    const users = await userRepository.find({
      relations: ["tasks", "credential", "avatar"],
    });
    return users;
  } catch (error) {
    console.log("Error buscando los usuarios", error);
    throw new Error("Failed to search Users");
  }
};

export const getUserByIdService = async (id: string): Promise<User | null> => {
  try {
    const user = await userRepository.findOne({
      where: { id },
      relations: ["tasks", "credential", "avatar"],
    });
    return user;
  } catch (error) {
    console.log("Error buscando por id", error);
    throw new Error("Failed to search by id");
  }
};

export const addUserService = async (
  userDto: UserDto,
  username: string,
  password: string
): Promise<void> => {
  try {
    const newUser = await createUser(userDto, username);
    if (newUser) {
      await userRepository.save(newUser);
      const savedUser = await userRepository.findOneOrFail({
        where: { name: newUser.name },
      });
      const newCredentialId = await addCredentialService(
        username,
        password,
        savedUser
      );
      newUser.credential = await credentialRepository.findOneOrFail({
        where: { id: newCredentialId },
      });
      await userRepository.save(newUser);
    } else {
      throw new Error("User undefined");
    }
  } catch (error: any) {
    console.error("Error creando user", error.message || error);
    throw new Error("Failed creating user");
  }
};

const createUser = async (
  userDto: UserDto,
  username: string
): Promise<User> => {
  try {
    const savedAvatar = await createAvatar(username);
    const newUser = new User();
    newUser.name = userDto.name;
    newUser.email = userDto.email;
    newUser.birthdate = userDto.birthdate;
    newUser.createdAt = userDto.createdAt;
    newUser.updatedAt = userDto.updatedAt;
    newUser.avatar = savedAvatar;

    return newUser;
  } catch (error: any) {
    console.error("Error creating user", error.message || error);
    throw new Error("Failed to create user");
  }
};
