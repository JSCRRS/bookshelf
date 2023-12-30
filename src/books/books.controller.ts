import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Delete,
  Patch,
} from "@nestjs/common";
import { CreateBookDto } from "./dto/create-book.dto";
import { Book } from "./book.entity";
import { BooksService } from "./books.service";
import { UpdateBookDto } from "./dto/update-book.dto";

@Controller("books")
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  createBook(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return this.booksService.createBook(createBookDto);
  }

  @Get()
  findAllBooks(): Promise<Book[]> {
    return this.booksService.findAllBooks();
  }

  @Get(":id")
  findBookById(@Param("id") id: string): Promise<Book> {
    return this.booksService.findBookById(id);
  }

  @Patch(":id")
  updateBook(
    @Param("id") id: string,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<void> {
    return this.booksService.updateBook(updateBookDto);
  }

  @Delete(":id")
  @HttpCode(204)
  deleteBook(@Param("id") id: string): Promise<void> {
    return this.booksService.deleteBook(id);
  }
}
