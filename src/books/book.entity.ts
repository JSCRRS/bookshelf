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

  @Column({ type: 'year' })
  public year: string;

  @Column({ type: 'year', nullable: true })
  public yearFirstPublished: string;

  @Column({ type: 'tinyint' })
  public edition: number;

  @Column({ type: 'varchar', length: 20 })
  public language: string;

  @Column({ type: 'text' })
  public comment: string;
}
