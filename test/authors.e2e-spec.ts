import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateAuthorDto } from '../src/authors/dto/create-author.dto';
import { AuthorsService } from '../src/authors/authors.service';

describe('Authors (e2e)', () => {
  const authorId = '111aa111-a11a-111a-a111-11111a111a11';

  const authorFirstLastName: CreateAuthorDto = {
    firstName: 'A',
    lastName: 'B',
  };

  const author = {
    id: authorId,
    firstName: authorFirstLastName.firstName,
    lastName: authorFirstLastName.lastName,
  };

  const updateAuthor = {
    firsName: 'C',
    lastName: 'D',
  };

  const metaInformation = {
    currentPage: 1,
    itemsPerPage: 1,
    numberOfAllItems: 1,
    numberOfAllPages: 1,
  };

  let app: INestApplication;

  const authorsService = {
    createAuthor: () => author,
    getAllAuthors: () => {
      return { data: [author], metaInformation };
    },
    getAuthorById: () => author,
    updateAuthor: () => {
      return { id: authorId, ...updateAuthor };
    },
    deleteAuthor: () => {
      return {};
    },
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(AuthorsService)
      .useValue(authorsService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('creates an author', () => {
    return request(app.getHttpServer())
      .post('/authors')
      .send(authorFirstLastName)
      .expect(201)
      .expect(authorsService.createAuthor());
  });

  it('gets all authors', () => {
    return request(app.getHttpServer())
      .get('/authors')
      .expect(200)
      .expect(authorsService.getAllAuthors());
  });

  it('gets an author', () => {
    return request(app.getHttpServer())
      .get(`/authors/${authorId}`)
      .expect(200)
      .expect(authorsService.getAuthorById());
  });

  it('updates an author', () => {
    return request(app.getHttpServer())
      .patch(`/authors/${authorId}`)
      .send(updateAuthor)
      .expect(200)
      .expect(authorsService.updateAuthor());
  });

  it('deletes an author', () => {
    return request(app.getHttpServer())
      .delete(`/authors/${authorId}`)
      .expect(204)
      .expect(authorsService.deleteAuthor());
  });
});
