import {
  Body,
  Controller,
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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
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
  @Get(':id')
  public getAuthorById(@Param('id') id: string): Promise<Genre> {
    return this.service.getGenreById(id);
  }

  @ApiOperation({ summary: 'Update a genre.' })
  @ApiResponse({ status: 200, description: 'Genre updated.' })
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  public updateGenre(
    @Param('id') id: string,
    @Body() genre: CreateUpdateGenreDto,
  ): Promise<Genre> {
    return this.service.updateGenre(id, genre);
  }
}
