import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { Author } from '../authors/author.entity';
import { Genre } from '../genres/genre.entity';
import { Publisher } from '../publishers/publisher.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Author, Publisher, Genre])],
})
export class BooksModule {}
