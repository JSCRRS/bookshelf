import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PublishersService } from './publishers.service';
import { CreateUpdatePublisherDto } from './dto/create-update-gerne.dto';
import { Publisher } from './publisher.entity';
import { PaginationOptionsDto } from '../pagination/PaginationOptionsDto';
import { PaginationDto } from '../pagination/PaginationDto';

@ApiTags('Publishers')
@Controller('/publishers')
export class PublishersController {
  constructor(private readonly service: PublishersService) {}

  @ApiOperation({ summary: 'Create a new publisher.' })
  @ApiResponse({ status: 201, description: 'New publisher created.' })
  @Post()
  public createPublisher(
    @Body() publisher: CreateUpdatePublisherDto,
  ): Promise<Publisher> {
    return this.service.createPublisher(publisher);
  }

  @ApiOperation({ summary: 'Get all publishers.' })
  @ApiResponse({
    status: 200,
    description: 'All publishers found.',
    type: [Publisher],
  })
  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  public getAllPublishers(
    @Query() paginationOptionsDto: PaginationOptionsDto,
  ): Promise<PaginationDto<Publisher>> {
    return this.service.getAllPublishers(paginationOptionsDto);
  }
}
