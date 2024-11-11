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
import { GenresService } from './genres.service';
import { Genre } from './genre.entity';
import { CreateUpdateGenreDto } from './dto/create-update-genre.dto';
import { PaginationOptionsDto } from '../pagination/PaginationOptionsDto';
import { PaginationDto } from '../pagination/PaginationDto';

@ApiTags('Genres')
@Controller('/genres')
export class GenresController {
  constructor(private readonly service: GenresService) {}

  @ApiOperation({ summary: 'Create a new genre.' })
  @ApiResponse({ status: 201, description: 'New genre created.', type: Genre })
  @ApiConflictResponse({ description: 'The genre exists already.' })
  @ApiBadRequestResponse({
    description: 'At least one of the required fields is missing.',
  })
  @Post()
  public createGenre(@Body() genre: CreateUpdateGenreDto): Promise<Genre> {
    return this.service.createGenre(genre);
  }

  @ApiOperation({ summary: 'Get all genres.' })
  @ApiResponse({
    status: 200,
    description: 'All genres found.',
    type: [Genre],
  })
  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  public getAllGenres(
    @Query() paginationOptionsDto: PaginationOptionsDto,
  ): Promise<PaginationDto<Genre>> {
    return this.service.getAllGenres(paginationOptionsDto);
  }

  @ApiOperation({ summary: 'Get a genre by id.' })
  @ApiResponse({ status: 200, description: 'Genre found.', type: Genre })
  @ApiNotFoundResponse({ description: 'Genre does not exist.' })
  @Get(':id')
  public getAuthorById(@Param('id') id: string): Promise<Genre> {
    return this.service.getGenreById(id);
  }

  @ApiOperation({ summary: 'Update a genre.' })
  @ApiResponse({ status: 200, description: 'Genre updated.' })
  @ApiNotFoundResponse({ description: 'Genre does not exist.' })
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  public updateGenre(
    @Param('id') id: string,
    @Body() genre: CreateUpdateGenreDto,
  ): Promise<Genre> {
    return this.service.updateGenre(id, genre);
  }

  @ApiOperation({ summary: 'Delete one genre.' })
  @ApiResponse({
    status: 204,
    description: 'Genre deleted.',
  })
  @ApiNotFoundResponse({ description: 'Genre does not exist.' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public deleteGenre(@Param('id') id: string): Promise<void> {
    return this.service.deleteGenre(id);
  }
}
