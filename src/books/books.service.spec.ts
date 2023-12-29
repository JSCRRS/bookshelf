import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { BooksService } from './books.service';

const bookList = [
    {
        id: "1",
        author: "A A",
        title: "A Title",
        year: 2020,
    },
    {
        id: "2",
        author: "B B",
        title: "B Title",
        year: 1920,
    }
];

const singleBook = {
        id: "1",
        author: "A A",
        title: "A Title",
        year: 2020,
};

describe("BookService", () => {
    let bookService: BooksService;
    let repository: Repository<Book>;

    beforeEach(async() => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BooksService, {
                provide: getRepositoryToken(Book),
                useValue: {
                    save: jest.fn().mockResolvedValue(singleBook),
                    find: jest.fn().mockResolvedValue(bookList),
                    findOneBy: jest.fn().mockResolvedValue(singleBook),
                    update: jest.fn(),
                    delete: jest.fn(),
                }
            }],
            
        }).compile();

        bookService = module.get<BooksService>(BooksService);
        repository = module.get<Repository<Book>>(getRepositoryToken(Book));
    });

    describe("create", () => {
        it("creates a new book entry", () => {
            expect(bookService.createBook(singleBook)).resolves.toEqual(singleBook)
        });
    });

    describe("find", () => {
        it("finds all book entries", async () => {
            const books = await bookService.findAllBooks();

            expect(books).toEqual(bookList);
        });

        it("finds a specific book by ID", async () => {
            const book = await bookService.findBookById("1");

            expect(book).toEqual(singleBook)
        });
    });

    describe("update", () => {
        it("updates a book entry", async () => {
            const updateValues = {
                ...singleBook,
                title: "updatedTitle"
            };
            const updateSpy = jest.spyOn(repository, "update");
            const updatedBook = await bookService.updateBook(updateValues);

            expect(updateSpy).toHaveBeenCalledWith(updateValues.id, updateValues)
            expect(updatedBook).toBeUndefined();
        });
    });

    describe("delete", () => {
        it("deletes a book entry", async () => {
            const deleteSpy = jest.spyOn(repository, "delete");
            const deletedBook = await bookService.deleteBook(singleBook.id);
            
            expect(deleteSpy).toHaveBeenCalledWith(singleBook.id);
            expect(deletedBook).toBeUndefined();
        })
    })
})

