import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './author.entity';
import { Repository } from 'typeorm';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorsService {
  public constructor(
    @InjectRepository(Author)
    private readonly repository: Repository<Author>,
  ) {}

  public async createAuthor(author: CreateAuthorDto): Promise<Author> {
    const searchResult = await this.repository.findOneBy({
      firstName: author.firstName,
      lastName: author.lastName,
    });
    if (searchResult) {
      throw new ConflictException(
        `Author with name '${author.firstName} ${author.lastName}' already exists.`,
      );
    }
    return await this.repository.save({
      firstName: author.firstName,
      lastName: author.lastName,
    });
  }

  public async getAllAuthors(): Promise<Author[]> {
    return await this.repository.find();
  }

  public async getAuthorById(id: string): Promise<Author> {
    const searchResult = await this.repository.findOneBy({ id: id });
    if (searchResult) {
      return searchResult;
    } else {
      throw new HttpException(
        `Could not find author with id '${id}'.`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  public async updateAuthor(
    id: string,
    updateAuthorDto: UpdateAuthorDto,
  ): Promise<Author> {
    if (!updateAuthorDto.firstName && !updateAuthorDto.lastName) {
      throw new HttpException(
        'Either firstName or lastName must be given.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const searchResult = await this.repository.findOneBy({ id: id });
    if (searchResult) {
      await this.repository.update(id, {
        firstName: updateAuthorDto.firstName,
        lastName: updateAuthorDto.lastName,
      });
      return await this.repository.findOneBy({ id: id });
    } else {
      throw new HttpException(
        `Could not find author with id '${id}'.`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  public async deleteAuthor(id: string): Promise<void> {
    const searchResult = await this.repository.findOneBy({ id: id });
    if (searchResult) {
      await this.repository.delete(id);
    } else {
      throw new HttpException(
        `Author with id '${id}' does not exist.`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
