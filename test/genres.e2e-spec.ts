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

  const updateGenre = {
    name: 'B',
  };

  const metaInformation = {
    currentPage: 1,
    itemsPerPage: 1,
    numberOfAllItems: 1,
    numberOfAllPages: 1,
  };

  let app: INestApplication;

  const genresService = {
    createGenre: () => genre,
    getAllGenres: () => {
      return { data: [genre], metaInformation };
    },
    getGenreById: () => genre,
    updateGenre: () => {
      return { id: genreId, ...updateGenre, books: [] };
    },
    deleteGenre: () => {
      return {};
    },
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

  it('gets all genres', () => {
    return request(app.getHttpServer())
      .get('/genres')
      .expect(200)
      .expect(genresService.getAllGenres());
  });

  it('gets a genre', () => {
    return request(app.getHttpServer())
      .get(`/genres/${genreId}`)
      .expect(200)
      .expect(genresService.getGenreById());
  });

  it('updates a genre', () => {
    return request(app.getHttpServer())
      .patch(`/genres/${genreId}`)
      .send(updateGenre)
      .expect(200)
      .expect(genresService.updateGenre());
  });

  it('deletes a genre', () => {
    return request(app.getHttpServer())
      .delete(`/genres/${genreId}`)
      .expect(204)
      .expect(genresService.deleteGenre());
  });
});
