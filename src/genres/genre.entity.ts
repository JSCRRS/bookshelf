import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Book } from '../books/book.entity';

@Entity({ name: 'genres' })
@Unique(['name'])
export class Genre {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: 'varchar', length: 50 })
  public name: string;

  @ManyToMany(() => Book, (book) => book.genres)
  public books: Book[];
}
