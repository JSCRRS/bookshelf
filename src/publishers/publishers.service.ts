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
}
