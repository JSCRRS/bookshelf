import { Body, Controller, Post } from '@nestjs/common';
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
}
