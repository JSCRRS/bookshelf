import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AuthorsModule } from './authors/authors.module';
import { Author } from './authors/author.entity';
import { GenresModule } from './genres/genres.module';
import { Genre } from './genres/genre.entity';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'bookshelf',
      password: 'root',
      database: 'books',
      entities: [Author, Genre],
      synchronize: true,
    }),
    AuthorsModule,
    GenresModule,
    HealthModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
