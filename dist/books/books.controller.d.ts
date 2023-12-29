import { CreateBookDto } from "./dto/create-book.dto";
import { Book } from "./book.entity";
import { BooksService } from "./books.service";
import { UpdateBookDto } from "./dto/update-book.dto";
export declare class BooksController {
    private readonly booksService;
    constructor(booksService: BooksService);
    createBook(createBookDto: CreateBookDto): Promise<Book>;
    findAllBooks(): Promise<Book[]>;
    findBookById(id: string): Promise<Book>;
    updateBook(id: string, updateBookDto: UpdateBookDto): Promise<void>;
    deleteBook(id: string): Promise<void>;
}
