import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity({ name: "avatar" })
export class Avatar {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 255 })
  url: string;

  @OneToOne(() => User, (user) => user.avatar)
  user: User;
}
