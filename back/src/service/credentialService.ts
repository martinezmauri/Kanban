import { Credential } from "../entities/Credential";
import { User } from "../entities/User";
import credentialRepository from "../Repositories/CredentialRepository";
import { createHash } from "crypto";

export const addCredentialService = async (
  username: string,
  password: string,
  user: User
): Promise<string> => {
  const hashedPassword = hashingPassword(password);

  const newCredential = new Credential();
  newCredential.username = username;
  newCredential.hashedPassword = hashedPassword;
  newCredential.user = user;

  await credentialRepository.save(newCredential);
  return newCredential.id;
};

export const hashingPassword = (password: string): string => {
  const hashedPassword = createHash("sha256").update(password).digest("hex");
  return hashedPassword;
};

export const verifyCredentialService = async (
  username: string,
  password: string
): Promise<User | null> => {
  const hashedPassword = hashingPassword(password);
  const credential = await credentialRepository.findOne({
    where: { username, hashedPassword },
    relations: ["user"],
  });

  return credential ? credential.user : null;
};
