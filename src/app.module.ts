import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AuthorsModule } from './authors/authors.module';
import { Author } from './authors/author.entity';
import { GenresModule } from './genres/genres.module';
import { Genre } from './genres/genre.entity';
import { HealthModule } from './health/health.module';
import { ConfigModule } from '@nestjs/config';
import { Publisher } from './publishers/publisher.entity';
import { PublishersModule } from './publishers/publishers.module';
import { Book } from './books/book.entity';
import { BooksModule } from './books/books.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Author, Genre, Publisher, Book],
      synchronize: true,
    }),
    HealthModule,
    AuthorsModule,
    GenresModule,
    PublishersModule,
    BooksModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
