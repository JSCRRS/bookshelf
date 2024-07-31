import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './author.entity';
import { Repository } from 'typeorm';
import { CreateAuthorDto } from './dto/create-author.dto';

@Injectable()
export class AuthorsService {
  public constructor(
    @InjectRepository(Author)
    private readonly repository: Repository<Author>,
  ) {}

  public async createAutor(author: CreateAuthorDto): Promise<Author> {
    /*     const searchResult = await this.repository.findOneBy({ name: author.name});
    if (searchResult) {
      throw new ConflictException(`Author with name ${author.name} already exists.`);
    } */
    return await this.repository.save({
      name: author.name,
    });
  }
}
