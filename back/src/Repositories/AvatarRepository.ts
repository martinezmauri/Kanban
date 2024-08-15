import { AppDataSource } from "../config/data-source";
import { Avatar } from "../entities/Avatar";

const avatarRepository = AppDataSource.getRepository(Avatar);

export default avatarRepository;
