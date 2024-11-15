import { Repository } from 'typeorm';
import { BooksService } from './books.service';
import { Book } from './book.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { PaginationOptionsDto } from '../pagination/PaginationOptionsDto';
import { UpdateBookDto } from './dto/update-book.dto';

const bookId = '111aa111-a11a-111a-a111-11111a111a11';
const bookTitle = 'test';
const authorIds = ['111aa111-a11a-111a-a111-11111a111a11'];
const genreIds = ['111aa111-a11a-111a-a111-11111a111a11'];
const publisherId = '111aa111-a11a-111a-a111-11111a111a11';

const createBookDto: CreateBookDto = {
  authorIds: authorIds,
  title: 'test',
  year: '1999',
  yearFirstPublished: undefined,
  edition: 1,
  language: 'english',
  publisherId: publisherId,
  genreIds: genreIds,
  comment: 'my comment',
};

const author = {
  id: '111aa111-a11a-111a-a111-11111a111a11',
  firstName: 'A',
  lastName: 'B',
  birthDate: '2000-01-01',
  cityOfBirth: 'city',
  countryOfBirth: 'country',
};

const genre = {
  id: '111aa111-a11a-111a-a111-11111a111a11',
  name: 'testGenre',
};

const publisher = {
  id: '111aa111-a11a-111a-a111-11111a111a11',
  name: 'testPublisher',
  city: 'testCity',
  country: 'testCountry',
};

const book = {
  id: bookId,
  title: createBookDto.title,
  year: createBookDto.year,
  yearFirstPublished: null,
  edition: createBookDto.edition,
  language: createBookDto.language,
  publisher: publisher,
  comment: createBookDto.comment,
  authors: [author],
  genres: [genre],
};

const updatedBook = {
  title: 'updatedTitle',
  ...book,
};

const metaInformation = {
  currentPage: 1,
  itemsPerPage: 1,
  numberOfAllItems: 1,
  numberOfAllPages: 1,
};

describe('BooksService', () => {
  let booksService: BooksService;
  let repository: Repository<Book>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getRepositoryToken(Book),
          useValue: {
            findOneBy: jest.fn().mockResolvedValue(book),
            findOne: jest.fn().mockResolvedValue(book),
            save: jest.fn().mockResolvedValue(book),
            delete: jest.fn(),
            createQueryBuilder: jest.fn().mockReturnValue({
              leftJoinAndSelect: jest.fn().mockReturnThis(),
              orderBy: jest.fn().mockReturnThis(),
              skip: jest.fn().mockReturnThis(),
              take: jest.fn().mockReturnThis(),
              getCount: jest.fn().mockReturnValue(1),
              getMany: jest.fn().mockResolvedValue([book]),
            }),
          },
        },
      ],
    }).compile();
    booksService = module.get<BooksService>(BooksService);
    repository = module.get<Repository<Book>>(getRepositoryToken(Book));
  });

  describe('createBook()', () => {
    it('saves and returns a book', () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);
      expect(booksService.createBook(createBookDto)).resolves.toEqual(book);
    });
    it('throws an error, if book already exists', () => {
      expect(booksService.createBook(createBookDto)).rejects.toThrow(
        Error(`Book with title '${createBookDto.title}' already exists.`),
      );
    });
  });

  describe('getAllBooks()', () => {
    it('gets all books', () => {
      const queryParams: PaginationOptionsDto = {
        currentPage: 1,
        itemsPerPage: 1,
        skipNumberOfPages: 0,
      };
      expect(booksService.getAllBooks(queryParams)).resolves.toEqual({
        data: [book],
        metaInformation,
      });
    });
  });

  describe('getBookByIdOrTitle()', () => {
    it('gets and returns a book by id', () => {
      expect(booksService.getBookByIdOrTitle(bookId)).resolves.toEqual(book);
    });
    it('gets and returns a book by title', () => {
      expect(booksService.getBookByIdOrTitle(bookTitle)).resolves.toEqual(book);
    });
    it('throws an error, if book does not exist', () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);
      expect(booksService.getBookByIdOrTitle(bookId)).rejects.toThrow(
        Error(`Could not find book with id or title '${bookId}'.`),
      );
    });
  });

  describe('updateBook()', () => {
    const updateBook: UpdateBookDto = {
      title: updatedBook.title,
    };
    it('updates a book', () => {
      expect(booksService.updateBook(bookId, updateBook)).resolves.toEqual(
        updatedBook,
      );
    });
    it('throws an error, if book could not be found', () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);
      expect(booksService.updateBook(bookId, updateBook)).rejects.toThrow(
        Error(`Could not find book with id '${bookId}'.`),
      );
    });
  });

  describe('deleteBook()', () => {
    it('deletes a book', () => {
      expect(booksService.deleteBook(bookId)).resolves.toBeUndefined();
    });
    it('throws an error, if book does not exist', () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);
      expect(booksService.deleteBook(bookId)).rejects.toThrow(
        Error(`Book with id '${bookId}' does not exist.`),
      );
    });
  });
});
