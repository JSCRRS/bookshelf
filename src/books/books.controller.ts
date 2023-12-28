import { Body, Controller, Get, HttpCode, Param, Post, Delete } from "@nestjs/common";
import { CreateBookDto } from "./dto/create-book.dto";
import { Book } from "./book.entity";
import { BooksService } from "./books.service";

@Controller("books")
export class BooksController {
    constructor(private readonly booksService: BooksService)
    {}

    @Post()
    createBook(@Body() createBookDto: CreateBookDto): Promise<Book> {
        return this.booksService.createBook(createBookDto);
    }

    @Get()
    findAllBooks(): Promise<Book[]> {
        return this.booksService.findAllBooks(); 
    }

    @Get(":id")
    findBookById(@Param ("id") id: string): Promise<Book> {
        return this.booksService.findBookById(id)
    }

    @Delete(":id")
    @HttpCode(204)
    deleteBook(@Param ("id") id: string): Promise<void> {
        return this.booksService.deleteBook(id);
    }
}