import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GenresService } from './genres.service';
import { Genre } from './genre.entity';
import { CreateGenreDto } from './dto/create-genre.dto';

@ApiTags('Genres')
@Controller('/genres')
export class GenresController {
  constructor(private readonly service: GenresService) {}

  @ApiOperation({ summary: 'Create a new genre.' })
  @ApiResponse({ status: 201, description: 'New genre created.', type: Genre })
  @Post()
  public createGenre(@Body() genre: CreateGenreDto): Promise<Genre> {
    return this.service.createGenre(genre);
  }

  @ApiOperation({ summary: 'Get a genre by id.' })
  @ApiResponse({ status: 200, description: 'Genre found.', type: Genre })
  @Get(':id')
  public getAuthorById(@Param('id') id: string): Promise<Genre> {
    return this.service.getGenreById(id);
  }
}
