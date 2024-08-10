import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateAuthorDto } from '../src/authors/dto/create-author.dto';
import { AuthorsService } from '../src/authors/authors.service';

describe('Authors (e2e)', () => {
  const author: CreateAuthorDto = {
    firstName: 'A',
    lastName: 'B',
  };

  const authorId = '111aa111-a11a-111a-a111-11111a111a11';

  let app: INestApplication;
  const authorsService = {
    createAuthor: () => {
      return { id: '1', ...author };
    },
    getAuthorById: () => {
      return { id: authorId, ...author };
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
      .send(author)
      .expect(201)
      .expect(authorsService.createAuthor());
  });

  it('gets an author', () => {
    return request(app.getHttpServer())
      .get(`/authors/${authorId}`)
      .expect(200)
      .expect(authorsService.getAuthorById());
  });

  it('deletes an author', () => {
    return request(app.getHttpServer())
      .delete(`/authors/${authorId}`)
      .expect(204)
      .expect(authorsService.deleteAuthor());
  });
});
