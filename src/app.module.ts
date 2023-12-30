import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BooksModule } from "./books/books.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "root",
      database: "bookshelf",
      autoLoadEntities: true,
      synchronize: true,
    }),
    BooksModule,
  ],
})
export class AppModule {}
