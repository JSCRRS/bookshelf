import { Repository } from 'typeorm';
import { GenresService } from './genres.service';
import { Genre } from './genre.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConflictException, HttpException, HttpStatus } from '@nestjs/common';

const genreName = 'A';

const genreId = '111aa111-a11a-111a-a111-11111a111a11';

const genre = {
  id: genreId,
  name: genreName,
};

describe('GenresService', () => {
  let genresService: GenresService;
  let repository: Repository<Genre>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GenresService,
        {
          provide: getRepositoryToken(Genre),
          useValue: {
            save: jest.fn().mockResolvedValue(genre),
            findOneBy: jest.fn().mockResolvedValue(genre),
          },
        },
      ],
    }).compile();

    genresService = module.get<GenresService>(GenresService);
    repository = module.get<Repository<Genre>>(getRepositoryToken(Genre));
  });

  describe('createGenre()', () => {
    it('saves and returns a genre', () => {
      expect(genresService.createGenre({ name: genreName })).resolves.toEqual(
        genre,
      );
    });
    it('throws an error, if genre already exists', () => {
      const error = {
        code: 'ER_DUP_ENTRY',
      };
      jest.spyOn(repository, 'save').mockRejectedValue(error);
      expect(genresService.createGenre({ name: genreName })).rejects.toThrow(
        new ConflictException(`Genre with name ${genreName} already exists.`),
      );
    });
    it('throws an unspecified error, if something else went wrong', () => {
      jest.spyOn(repository, 'save').mockRejectedValue(Error('Error!'));
      expect(genresService.createGenre({ name: genreName })).rejects.toThrow(
        new HttpException('Something went wrong...', HttpStatus.BAD_REQUEST),
      );
    });
  });

  describe('getGenreById', () => {
    it('gets and returns a genre by id', async () => [
      await expect(genresService.getGenreById(genreId)).resolves.toEqual(genre),
    ]);
    it('throws an error, if genre does not exist', () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);
      expect(genresService.getGenreById(genreId)).rejects.toThrow(
        Error(`Could not find genre with id '${genreId}'.`),
      );
    });
  });
});
