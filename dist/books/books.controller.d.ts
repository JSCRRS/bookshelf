import { CreateBookDto } from "./dto/create-book.dto";
import { Book } from "./book.entity";
import { BooksService } from "./books.service";
export declare class BooksController {
    private readonly booksService;
    constructor(booksService: BooksService);
    createBook(createBookDto: CreateBookDto): Promise<Book>;
    findAllBooks(): Promise<Book[]>;
}
