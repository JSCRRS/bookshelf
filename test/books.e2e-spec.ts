import { INestApplication } from '@nestjs/common';
import { CreateBookDto } from '../src/books/dto/create-book.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { BooksService } from '../src/books/books.service';
import * as request from 'supertest';

describe('Books (e2e)', () => {
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

  const updateBook = {
    title: 'updatedTitle',
  };

  const metaInformation = {
    currentPage: 1,
    itemsPerPage: 1,
    numberOfAllItems: 1,
    numberOfAllPages: 1,
  };

  let app: INestApplication;

  const booksService = {
    createBook: () => book,
    getAllBooks: () => {
      return { data: [book], metaInformation };
    },
    getBookByIdOrTitle: () => book,
    updateBook: () => {
      return { id: bookId, ...updateBook, ...book };
    },
    deleteBook: () => {
      return {};
    },
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(BooksService)
      .useValue(booksService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('creates a book', () => {
    return request(app.getHttpServer())
      .post('/books')
      .send(createBookDto)
      .expect(201)
      .expect(booksService.createBook());
  });

  it('gets all books', () => {
    return request(app.getHttpServer())
      .get('/books')
      .expect(200)
      .expect(booksService.getAllBooks());
  });

  it('gets a book by id', () => {
    return request(app.getHttpServer())
      .get(`/books/${bookId}`)
      .expect(200)
      .expect(booksService.getBookByIdOrTitle());
  });

  it('gets a book by title', () => {
    return request(app.getHttpServer())
      .get(`/books/${bookTitle}`)
      .expect(200)
      .expect(booksService.getBookByIdOrTitle());
  });

  it('updates a book', () => {
    return request(app.getHttpServer())
      .patch(`/books/${bookId}`)
      .send(updateBook)
      .expect(200)
      .expect(booksService.updateBook());
  });

  it('deletes a book', () => {
    return request(app.getHttpServer())
      .delete(`/books/${bookId}`)
      .expect(204)
      .expect(booksService.deleteBook());
  });
});
