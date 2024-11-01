import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Author } from '../authors/author.entity';
import { Publisher } from '../publishers/publisher.entity';
import { Genre } from '../genres/genre.entity';

@Entity({ name: 'books' })
export class Book {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ManyToMany(() => Author, (author) => author.books, { eager: true })
  @JoinTable({ name: 'book_author_relations' })
  public authors: Author[];

  @Column({ type: 'varchar', length: 100 })
  public title: string;

  @Column({ type: 'year' })
  public year: string;

  @Column({ type: 'year', nullable: true })
  public yearFirstPublished: string;

  @Column({ type: 'tinyint' })
  public edition: number;

  @Column({ type: 'varchar', length: 20 })
  public language: string;

  @ManyToOne(() => Publisher, (publisher) => publisher.books)
  public publisher: Publisher;

  @ManyToMany(() => Genre, (genre) => genre.books)
  @JoinTable({ name: 'book_genre_relations' })
  public genres: Genre[];

  @Column({ type: 'text', nullable: true })
  public comment: string;
}
