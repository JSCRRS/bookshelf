import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'authors' })
export class Author {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: 'varchar', length: 50 })
  public firstName: string;

  @Column({ type: 'varchar', length: 50 })
  public lastName: string;

  @Column({ type: 'date' })
  public birthDate: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  public cityOfBirth: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  public countryOfBirth: string;
}
