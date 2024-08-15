import { Avatar } from "../entities/Avatar";
import avatarRepository from "../Repositories/AvatarRepository";

const createAvatar = async (username: string): Promise<Avatar> => {
  try {
    const avatar = new Avatar();
    avatar.url = `https://api.multiavatar.com/${username}.png`;
    const savedAvatar = await avatarRepository.save(avatar);
    return savedAvatar;
  } catch (error) {
    console.error("Error creando avatar");
    throw new Error("Failed creating avatar");
  }
};

export default createAvatar;
