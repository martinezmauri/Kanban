import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Credential } from "../entities/Credential";
import { Task } from "../entities/Task";
import { Avatar } from "../entities/Avatar";
import { Status } from "../entities/Status";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "42422371",
  database: "ToDo_List",
  synchronize: true,
  logging: false,
  entities: [User, Credential, Task, Avatar, Status],
  subscribers: [],
  migrations: [],
  /* dropSchema: true, */
});
