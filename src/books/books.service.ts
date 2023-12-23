import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BooksService {
    constructor(
        @InjectRepository(Book)
        private readonly booksRepository: Repository<Book>,
    ) {}

    async createBook(createBookDto: CreateBookDto): Promise<Book> {
        const book = new Book();
        book.author = createBookDto.author;
        book.title = createBookDto.title;
        book.year = createBookDto.year;

        return await this.booksRepository.save(book)
    }

    async findAllBooks(): Promise<Book[]> {
        return await this.booksRepository.find();
    }

    async findBookById(id: string): Promise<Book> {
        return await this.booksRepository.findOneBy({ id });
    }

    async updateBook(book: Book): Promise<void> {
        await this.booksRepository.update(book.id, book)
    }

    async deleteBook(id: string): Promise<void> {
        await this.booksRepository.delete(id)
    }
}