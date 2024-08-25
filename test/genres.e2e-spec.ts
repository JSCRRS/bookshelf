import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { GenresService } from '../src/genres/genres.service';

describe('Genres (e2e)', () => {
  const genreName = 'A';

  const genreId = '111aa111-a11a-111a-a111-11111a111a11';

  const genre = {
    id: genreId,
    name: genreName,
  };

  let app: INestApplication;

  const genresService = {
    createGenre: () => genre,
    getGenreById: () => genre,
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(GenresService)
      .useValue(genresService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('creates a genre', () => {
    return request(app.getHttpServer())
      .post('/genres')
      .send(genreName)
      .expect(201)
      .expect(genresService.createGenre());
  });

  it('gets a genre', () => {
    return request(app.getHttpServer())
      .get(`/genres/${genreId}`)
      .expect(200)
      .expect(genresService.getGenreById());
  });
});
