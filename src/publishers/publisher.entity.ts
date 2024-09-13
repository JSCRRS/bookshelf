import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Book } from '../books/book.entity';

@Entity({ name: 'publishers' })
@Unique(['name'])
export class Publisher {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: 'varchar', length: 100 })
  public name: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  public city: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  public country: string;

  @OneToMany(() => Book, (book) => book.publisher)
  public books: Book[];
}
