import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BooksService } from './books.service';
import { Book } from './book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { PaginationOptionsDto } from '../pagination/PaginationOptionsDto';
import { PaginationDto } from '../pagination/PaginationDto';

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

  @ApiOperation({ summary: 'Get all books.' })
  @ApiResponse({
    status: 200,
    description: 'All books found.',
    type: [Book],
  })
  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  public getAllBooks(
    @Query() paginationOptionsDto: PaginationOptionsDto,
  ): Promise<PaginationDto<Book>> {
    return this.service.getAllBooks(paginationOptionsDto);
  }

  @ApiOperation({ summary: 'Get a book by id or title.' })
  @ApiResponse({ status: 200, description: 'Book found.', type: Book })
  @Get(':idOrTitle')
  public getBookByIdOrTitle(
    @Param('idOrTitle') idOrTitle: string,
  ): Promise<Book> {
    return this.service.getBookByIdOrTitle(idOrTitle);
  }

  @ApiOperation({ summary: 'Delete one book.' })
  @ApiResponse({
    status: 204,
    description: 'Book deleted.',
  })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public deleteBook(@Param('id') id: string): Promise<void> {
    return this.service.deleteBook(id);
  }
}
