import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PublishersService } from './publishers.service';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { Publisher } from './publisher.entity';
import { PaginationOptionsDto } from '../pagination/PaginationOptionsDto';
import { PaginationDto } from '../pagination/PaginationDto';
import { UpdatePublisherDto } from './dto/update-publisher.dto';

@ApiTags('Publishers')
@Controller('/publishers')
export class PublishersController {
  constructor(private readonly service: PublishersService) {}

  @ApiOperation({ summary: 'Create a new publisher.' })
  @ApiResponse({ status: 201, description: 'New publisher created.' })
  @ApiConflictResponse({ description: 'The publisher exists already.' })
  @ApiBadRequestResponse({
    description: 'At least one of the required fields is missing.',
  })
  @Post()
  public createPublisher(
    @Body() publisher: CreatePublisherDto,
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

  @ApiOperation({ summary: 'Get a publisher by id.' })
  @ApiResponse({
    status: 200,
    description: 'Publisher found.',
    type: Publisher,
  })
  @ApiNotFoundResponse({ description: 'Publisher does not exist.' })
  @Get(':id')
  public getPublisherById(@Param('id') id: string): Promise<Publisher> {
    return this.service.getPublisherById(id);
  }

  @ApiOperation({ summary: 'Update a publisher.' })
  @ApiResponse({ status: 200, description: 'Publisher updated.' })
  @ApiNotFoundResponse({ description: 'Publisher does not exist.' })
  @ApiBadRequestResponse({
    description: 'At least one of the required fields is missing.',
  })
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  public updatePublisher(
    @Param('id') id: string,
    @Body() publisher: UpdatePublisherDto,
  ): Promise<Publisher> {
    return this.service.updatePublisher(id, publisher);
  }

  @ApiOperation({ summary: 'Delete a publisher.' })
  @ApiResponse({ status: 204, description: 'Publisher deleted.' })
  @ApiNotFoundResponse({ description: 'Publisher does not exist.' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public deletePublisher(@Param('id') id: string): Promise<void> {
    return this.service.deletePublisher(id);
  }
}
