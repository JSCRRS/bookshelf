import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'authors' })
export class Author {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: 'varchar', length: 50 })
  public name: string;
}
