import { Repository } from 'typeorm';
import { GenresService } from './genres.service';
import { Genre } from './genre.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConflictException, HttpException, HttpStatus } from '@nestjs/common';
import { PaginationOptionsDto } from '../pagination/PaginationOptionsDto';
import { CreateUpdateGenreDto } from './dto/create-update-genre.dto';

const genreName = 'A';

const genreId = '111aa111-a11a-111a-a111-11111a111a11';

const genre = {
  id: genreId,
  name: genreName,
};

const updatedGenre = {
  id: genreId,
  name: 'B',
  books: [],
};

const metaInformation = {
  currentPage: 1,
  itemsPerPage: 1,
  numberOfAllItems: 1,
  numberOfAllPages: 1,
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
            findOne: jest.fn().mockResolvedValue(genre),
            update: jest.fn().mockResolvedValue(updatedGenre),
            delete: jest.fn(),
            createQueryBuilder: jest.fn().mockReturnValue({
              orderBy: jest.fn().mockReturnThis(),
              skip: jest.fn().mockReturnThis(),
              take: jest.fn().mockReturnThis(),
              getCount: jest.fn().mockReturnValue(1),
              getMany: jest.fn().mockResolvedValue([genre]),
            }),
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

  describe('getAllGenres()', () => {
    it('gets all genres', () => {
      const queryParams: PaginationOptionsDto = {
        currentPage: 1,
        itemsPerPage: 1,
        skipNumberOfPages: 0,
      };
      expect(genresService.getAllGenres(queryParams)).resolves.toEqual({
        data: [genre],
        metaInformation,
      });
    });
  });

  describe('getGenreById()', () => {
    it('gets and returns a genre by id', async () => [
      await expect(genresService.getGenreById(genreId)).resolves.toEqual(genre),
    ]);
    it('throws an error, if genre does not exist', () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);
      expect(genresService.getGenreById(genreId)).rejects.toThrow(
        Error(`Could not find genre with id '${genreId}'.`),
      );
    });
  });

  describe('updateGenre()', () => {
    const updateGenre: CreateUpdateGenreDto = {
      name: updatedGenre.name,
    };
    it('updates a genre', () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(updatedGenre);
      expect(genresService.updateGenre(genreId, updateGenre)).resolves.toEqual(
        updatedGenre,
      );
    });
    it('throws an error, if author could not be found', () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);
      expect(genresService.updateGenre(genreId, updateGenre)).rejects.toThrow(
        Error(`Could not find genre with id '${genreId}'.`),
      );
    });
  });

  describe('deleteGenre()', () => {
    it('deletes a genre', () => {
      expect(genresService.deleteGenre(genreId)).resolves.toBeUndefined();
    });
    it('throws an error, if genre does not exist', () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);
      expect(genresService.deleteGenre(genreId)).rejects.toThrow(
        Error(`Genre with id '${genreId}' does not exist.`),
      );
    });
  });
});
