import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Author } from '../authors/author.entity';

@Entity({ name: 'books' })
export class Book {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: 'varchar', length: 100 })
  public title: string;

  @ManyToMany(() => Author, (author) => author.books, { eager: true })
  @JoinTable({ name: 'book_author_relations' })
  public authors: Author[];
}
