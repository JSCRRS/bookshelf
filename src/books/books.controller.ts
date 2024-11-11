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
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BooksService } from './books.service';
import { Book } from './book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { PaginationOptionsDto } from '../pagination/PaginationOptionsDto';
import { PaginationDto } from '../pagination/PaginationDto';
import { UpdateBookDto } from './dto/update-book.dto';

@ApiTags('Books')
@Controller('/books')
export class BooksController {
  constructor(private readonly service: BooksService) {}

  @ApiOperation({ summary: 'Create a new book.' })
  @ApiResponse({ status: 201, description: 'New book created.', type: Book })
  @ApiConflictResponse({ description: 'The book exists already.' })
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
  @ApiNotFoundResponse({ description: 'Book does not exist.' })
  @Get(':idOrTitle')
  public getBookByIdOrTitle(
    @Param('idOrTitle') idOrTitle: string,
  ): Promise<Book> {
    return this.service.getBookByIdOrTitle(idOrTitle);
  }

  @ApiOperation({ summary: 'Update a book.' })
  @ApiResponse({ status: 200, description: 'Book updated.' })
  @ApiNotFoundResponse({ description: 'Book does not exist.' })
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  public updateBook(
    @Param('id') id: string,
    @Body() book: UpdateBookDto,
  ): Promise<Book> {
    return this.service.updateBook(id, book);
  }

  @ApiOperation({ summary: 'Delete one book.' })
  @ApiResponse({
    status: 204,
    description: 'Book deleted.',
  })
  @ApiNotFoundResponse({ description: 'Book does not exist.' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public deleteBook(@Param('id') id: string): Promise<void> {
    return this.service.deleteBook(id);
  }
}
