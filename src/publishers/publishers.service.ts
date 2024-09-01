import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Publisher } from './publishers.module';
import { Repository } from 'typeorm';
import { CreateUpdatePublisherDto } from './dto/create-update-gerne.dto';
import { PaginationOptionsDto } from '../pagination/PaginationOptionsDto';
import { PaginationDto } from '../pagination/PaginationDto';
import { PaginationMetaInformationDto } from '../pagination/PaginationMetaInformationDto';

@Injectable()
export class PublishersService {
  public constructor(
    @InjectRepository(Publisher)
    private readonly repository: Repository<Publisher>,
  ) {}

  public async createPublisher(
    publisher: CreateUpdatePublisherDto,
  ): Promise<Publisher> {
    try {
      return await this.repository.save({
        name: publisher.name,
      });
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException(
          `Publisher with name '${publisher.name}' already exists.`,
        );
      } else {
        throw new HttpException(
          'Something went wrong...',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }

  public async getAllPublishers(
    paginationOptionsDto: PaginationOptionsDto,
  ): Promise<PaginationDto<Publisher>> {
    const publishersQueryBuilder =
      this.repository.createQueryBuilder('publishers');

    const publisherList = await publishersQueryBuilder
      .orderBy('publishers.name')
      .skip(paginationOptionsDto.skipNumberOfPages)
      .take(paginationOptionsDto.itemsPerPage)
      .getMany();

    const numberOfAllItems = await publishersQueryBuilder.getCount();

    const paginationMetaDto = new PaginationMetaInformationDto({
      numberOfAllItems,
      paginationOptionsDto,
    });

    return new PaginationDto(publisherList, paginationMetaDto);
  }

  public async getPublisherById(id: string): Promise<Publisher> {
    const searchResult = await this.repository.findOneBy({ id: id });
    if (searchResult) {
      return searchResult;
    } else {
      throw new HttpException(
        `Could not find publisher with id '${id}'.`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  public async updatePublisher(
    id: string,
    updatePublisherDto: CreateUpdatePublisherDto,
  ): Promise<Publisher> {
    const searchResult = await this.repository.findOneBy({ id: id });
    if (searchResult) {
      await this.repository.update(id, { name: updatePublisherDto.name });
      return await this.repository.findOneBy({ id: id });
    } else {
      throw new HttpException(
        `Could not find publisher with id '${id}'.`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  public async deletePublisher(id: string): Promise<void> {
    const searchResult = await this.repository.findOneBy({ id: id });
    if (searchResult) {
      this.repository.delete(id);
    } else {
      throw new HttpException(
        `Publisher with id '${id}' does not exist.`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
