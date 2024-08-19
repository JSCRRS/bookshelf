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
import { AuthorsService } from './authors.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Author } from './author.entity';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { PaginationOptionsDto } from '../pagination/PaginationOptionsDto';
import { PaginationDto } from '../pagination/PaginationDto';

@ApiTags('Authors')
@Controller('/authors')
export class AuthorsController {
  constructor(private readonly service: AuthorsService) {}

  @ApiOperation({ summary: 'Create a new author.' })
  @ApiResponse({
    status: 201,
    description: 'New author created.',
    type: Author,
  })
  @Post()
  public createAuthor(@Body() author: CreateAuthorDto): Promise<Author> {
    return this.service.createAuthor(author);
  }

  @ApiOperation({ summary: 'Get all authors.' })
  @ApiResponse({
    status: 200,
    description: 'All authors found.',
    type: [Author],
  })
  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  public getAllAuthors(
    @Query() paginationOptionsDto: PaginationOptionsDto,
  ): Promise<PaginationDto<Author>> {
    return this.service.getAllAuthors(paginationOptionsDto);
  }

  @ApiOperation({ summary: 'Get an author by id.' })
  @ApiResponse({ status: 200, description: 'Author found.', type: Author })
  @Get(':id')
  public getAuthorById(@Param('id') id: string): Promise<Author> {
    return this.service.getAuthorById(id);
  }

  @ApiOperation({ summary: 'Update an author.' })
  @ApiResponse({ status: 200, description: 'Author updated.', type: Author })
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  public updateAuthor(
    @Param('id') id: string,
    @Body() author: UpdateAuthorDto,
  ): Promise<Author> {
    return this.service.updateAuthor(id, author);
  }

  @ApiOperation({ summary: 'Delete one author.' })
  @ApiResponse({
    status: 204,
    description: 'Author deleted.',
  })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public deleteAuthor(@Param('id') id: string): Promise<void> {
    return this.service.deleteAuthor(id);
  }
}
