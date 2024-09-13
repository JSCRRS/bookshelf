import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genre } from './genre.entity';
import { GenresService } from './genres.service';
import { GenresController } from './genres.controller';
import { Book } from '../books/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Genre, Book])],
  providers: [GenresService],
  controllers: [GenresController],
  exports: [GenresService],
})
export class GenresModule {}
