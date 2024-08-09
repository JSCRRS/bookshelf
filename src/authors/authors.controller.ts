import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Author } from './author.entity';
import { CreateAuthorDto } from './dto/create-author.dto';

@ApiTags('Authors')
@Controller('/authors')
export class AuthorsController {
  constructor(private readonly service: AuthorsService) {}

  @ApiOperation({ summary: 'Creates a new author.' })
  @ApiResponse({
    status: 201,
    description: 'New author created.',
    type: Author,
  })
  @Post()
  public createAuthor(@Body() author: CreateAuthorDto): Promise<Author> {
    return this.service.createAuthor(author);
  }

  @ApiOperation({ summary: 'Deletes one author.' })
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
