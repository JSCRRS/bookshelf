import { Module } from '@nestjs/common';
import { AuthorsController } from './authors/authors.controller';
import { AuthorsService } from './authors/authors.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'bookshelf',
      password: 'root',
      database: 'books',
      entities: [],
      synchronize: true,
    }),
  ],
  controllers: [AuthorsController],
  providers: [AuthorsService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
