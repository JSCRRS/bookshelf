import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Genre } from './genre.entity';
import { Repository } from 'typeorm';
import { CreateGenreDto } from './dto/create-genre.dto';

@Injectable()
export class GenresService {
  public constructor(
    @InjectRepository(Genre)
    private readonly repository: Repository<Genre>,
  ) {}

  public async createGenre(genre: CreateGenreDto): Promise<Genre> {
    try {
      return await this.repository.save({
        name: genre.name,
      });
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException(
          `Genre with name ${genre.name} already exists.`,
        );
      } else {
        throw new HttpException(
          'Something went wrong...',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }
}
