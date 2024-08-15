import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Credential } from "./Credential";
import { Task } from "./Task";
import { Avatar } from "./Avatar";

@Entity({ name: "user" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "varchar", length: 255 })
  email: string;

  @Column({ type: "date" })
  birthdate: Date;

  @OneToOne(() => Avatar, { eager: true })
  @JoinColumn()
  avatar: Avatar;

  @OneToMany(() => Task, (task) => task.assignedUser)
  tasks: Task[];

  @OneToOne(() => Credential, { eager: true })
  @JoinColumn()
  credential: Credential;

  @UpdateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
