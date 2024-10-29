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

  const createBookDto: CreateBookDto = {
    authorIds: authorIds,
    title: 'test',
    year: '1999',
    yearFirstPublished: undefined,
    edition: 1,
    language: 'english',
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

  const book = {
    id: bookId,
    title: createBookDto.title,
    year: createBookDto.year,
    yearFirstPublished: null,
    edition: createBookDto.edition,
    language: createBookDto.language,
    comment: createBookDto.comment,
    authors: [
      {
        id: author.id,
      },
    ],
  };

  let app: INestApplication;

  const booksService = {
    createBook: () => book,
    getBookByIdOrTitle: () => book,
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
});
