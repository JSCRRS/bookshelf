import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { Author } from '../authors/author.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Author])],
})
export class BooksModule {}
