import { Repository } from 'typeorm';
import { BooksService } from './books.service';
import { Book } from './book.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateBookDto } from './dto/create-book.dto';

const bookId = '111aa111-a11a-111a-a111-11111a111a11';
const bookTitle = 'test';
const authorIds = ['111aa111-a11a-111a-a111-11111a111a11'];

const createBookDto: CreateBookDto = {
  authorIds: authorIds,
  title: 'test',
  year: '1999',
};

const author = {
  id: '111aa111-a11a-111a-a111-11111a111a11',
  firstName: 'A',
  lastName: 'B',
  birthDate: '2000-01-01',
  cityOfBirth: 'city',
  countryOfBirth: 'country',
};

const book = {
  id: bookId,
  title: createBookDto.title,
  year: createBookDto.year,
  authors: [
    {
      id: author.id,
    },
  ],
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

  describe('getBookByIdOrTitle', () => {
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
});
