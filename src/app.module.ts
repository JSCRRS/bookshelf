import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AuthorsModule } from './authors/authors.module';

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
    AuthorsModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
