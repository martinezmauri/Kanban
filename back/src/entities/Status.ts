import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "status" })
export class Status {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 50 })
  status: string;
}
