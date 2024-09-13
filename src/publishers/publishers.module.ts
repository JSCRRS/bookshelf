import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publisher } from './publisher.entity';
import { PublishersService } from './publishers.service';
import { PublishersController } from './publishers.controller';
import { Book } from '../books/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Publisher, Book])],
  providers: [PublishersService],
  controllers: [PublishersController],
  exports: [PublishersService],
})
export class PublishersModule {}
export { Publisher };
