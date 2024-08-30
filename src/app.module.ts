import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AuthorsModule } from './authors/authors.module';
import { Author } from './authors/author.entity';
import { GenresModule } from './genres/genres.module';
import { Genre } from './genres/genre.entity';
import { HealthModule } from './health/health.module';
import { ConfigModule } from '@nestjs/config';

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
