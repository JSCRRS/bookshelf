import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookDto } from './dto/create-book.dto';
export declare class BooksService {
    private readonly booksRepository;
    constructor(booksRepository: Repository<Book>);
    createBook(createBookDto: CreateBookDto): Promise<Book>;
    findAllBooks(): Promise<Book[]>;
    findBookById(id: string): Promise<Book>;
    updateBook(book: Book): Promise<void>;
    deleteBook(id: string): Promise<void>;
}
