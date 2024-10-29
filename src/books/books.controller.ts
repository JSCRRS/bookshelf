import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BooksService } from './books.service';
import { Book } from './book.entity';
import { CreateBookDto } from './dto/create-book.dto';

@ApiTags('Books')
@Controller('/books')
export class BooksController {
  constructor(private readonly service: BooksService) {}

  @ApiOperation({ summary: 'Create a new book.' })
  @ApiResponse({ status: 201, description: 'New book created.', type: Book })
  @Post()
  public createBook(@Body() book: CreateBookDto): Promise<Book> {
    return this.service.createBook(book);
  }

  @ApiOperation({ summary: 'Get a book by id or title.' })
  @ApiResponse({ status: 200, description: 'Book found.', type: Book })
  @Get(':idOrTitle')
  public getBookByIdOrTitle(
    @Param('idOrTitle') idOrTitle: string,
  ): Promise<Book> {
    return this.service.getBookByIdOrTitle(idOrTitle);
  }
}
