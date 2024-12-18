import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Genre } from './genre.entity';
import { Repository } from 'typeorm';
import { CreateUpdateGenreDto } from './dto/create-update-genre.dto';
import { PaginationOptionsDto } from '../pagination/PaginationOptionsDto';
import { PaginationDto } from '../pagination/PaginationDto';
import { PaginationMetaInformationDto } from '../pagination/PaginationMetaInformationDto';

@Injectable()
export class GenresService {
  public constructor(
    @InjectRepository(Genre)
    private readonly repository: Repository<Genre>,
  ) {}

  public async createGenre(genre: CreateUpdateGenreDto): Promise<Genre> {
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

  public async getAllGenres(
    paginationOptionsDto: PaginationOptionsDto,
  ): Promise<PaginationDto<Genre>> {
    const genresQueryBuilder = this.repository.createQueryBuilder('genres');

    const genreList = await genresQueryBuilder
      .orderBy('genres.name')
      .skip(paginationOptionsDto.skipNumberOfPages)
      .take(paginationOptionsDto.itemsPerPage)
      .getMany();

    const numberOfAllItems = await genresQueryBuilder.getCount();

    const paginationMetaDto = new PaginationMetaInformationDto({
      numberOfAllItems,
      paginationOptionsDto,
    });

    return new PaginationDto(genreList, paginationMetaDto);
  }

  public async getGenreById(id: string): Promise<Genre> {
    const searchResult = await this.repository.findOne({
      where: { id: id },
      relations: ['books', 'books.authors', 'books.publisher'],
    });
    if (searchResult) {
      return searchResult;
    } else {
      throw new NotFoundException(`Could not find genre with id '${id}'.`);
    }
  }

  public async updateGenre(
    id: string,
    updateGenreDto: CreateUpdateGenreDto,
  ): Promise<Genre> {
    const searchResult = await this.repository.findOneBy({ id: id });
    if (searchResult) {
      await this.repository.update(id, { name: updateGenreDto.name });
      return await this.repository.findOneBy({ id: id });
    } else {
      throw new NotFoundException(`Could not find genre with id '${id}'.`);
    }
  }

  public async deleteGenre(id: string): Promise<void> {
    const searchResult = await this.repository.findOneBy({ id: id });
    if (searchResult) {
      await this.repository.delete(id);
    } else {
      throw new NotFoundException(`Genre with id '${id}' does not exist.`);
    }
  }
}
