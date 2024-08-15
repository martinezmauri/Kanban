import { AppDataSource } from "../config/data-source";
import { Status } from "../entities/Status";

const statusRepository = AppDataSource.getRepository(Status);

export default statusRepository;
