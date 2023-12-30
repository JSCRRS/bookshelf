import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Book {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
      author: string;

  @Column()
          title: string;

  @Column()
          year: number;
}
