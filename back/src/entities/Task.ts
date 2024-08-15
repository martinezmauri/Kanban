import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { Status } from "./Status";

@Entity({ name: "task" })
export class Task {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 255 })
  title: string;

  @Column({ type: "text" })
  description: string;

  @ManyToOne(() => User, (user) => user.tasks)
  @JoinColumn()
  assignedUser: User;

  @ManyToOne(() => Status)
  @JoinColumn()
  status: Status;

  @Column({ type: "varchar", length: 7, default: "#FFFFFF" })
  color: string;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updateAt: Date;
}
