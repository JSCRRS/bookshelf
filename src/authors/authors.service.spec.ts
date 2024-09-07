/* eslint @typescript-eslint/no-unused-vars: 0 */

import { Test, TestingModule } from '@nestjs/testing';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Author } from './author.entity';
import { Repository } from 'typeorm';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { PaginationOptionsDto } from '../pagination/PaginationOptionsDto';

const authorId = '111aa111-a11a-111a-a111-11111a111a11';

const createAuthorDto: CreateAuthorDto = {
  firstName: 'A',
  lastName: 'B',
  birthDate: '2000-01-01',
  cityOfBirth: 'somewhere',
};

const author = {
  id: authorId,
  firstName: createAuthorDto.firstName,
  lastName: createAuthorDto.lastName,
  birthDate: createAuthorDto.birthDate,
  cityOfBirth: createAuthorDto.cityOfBirth,
};

const updatedAuthor = {
  id: authorId,
  firstName: 'C',
  lastName: 'D',
  birthDate: '2002-02-02',
  cityOfBirth: 'somewhere_else',
};

const metaInformation = {
  currentPage: 1,
  itemsPerPage: 1,
  numberOfAllItems: 1,
  numberOfAllPages: 1,
};

describe('AuthorsService', () => {
  let authorsService: AuthorsService;
  let repository: Repository<Author>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorsService,
        {
          provide: getRepositoryToken(Author),
          useValue: {
            save: jest.fn().mockResolvedValue(author),
            delete: jest.fn(),
            findOneBy: jest.fn().mockResolvedValue(author),
            update: jest.fn().mockResolvedValue(updatedAuthor),
            createQueryBuilder: jest.fn().mockReturnValue({
              orderBy: jest.fn().mockReturnThis(),
              skip: jest.fn().mockReturnThis(),
              take: jest.fn().mockReturnThis(),
              getCount: jest.fn().mockReturnValue(1),
              getMany: jest.fn().mockResolvedValue([author]),
            }),
          },
        },
      ],
    }).compile();

    authorsService = module.get<AuthorsService>(AuthorsService);
    repository = module.get<Repository<Author>>(getRepositoryToken(Author));
  });

  describe('createAuthor()', () => {
    it('saves and returns an author', () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);
      expect(authorsService.createAuthor(createAuthorDto)).resolves.toEqual(
        author,
      );
    });
    it('throws an error, if author already exists', () => {
      expect(authorsService.createAuthor(createAuthorDto)).rejects.toThrow(
        Error("Author with name 'A B' already exists."),
      );
    });
  });

  describe('getAllAuthors()', () => {
    it('gets all authors', () => {
      const queryParams: PaginationOptionsDto = {
        currentPage: 1,
        itemsPerPage: 1,
        skipNumberOfPages: 0,
      };
      expect(authorsService.getAllAuthors(queryParams)).resolves.toEqual({
        data: [author],
        metaInformation,
      });
    });
  });

  describe('getAuthorById()', () => {
    it('gets and returns an author by id', () => {
      expect(authorsService.getAuthorById(authorId)).resolves.toEqual(author);
    });
    it('throws an error, if author does not exist', () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);
      expect(authorsService.getAuthorById(authorId)).rejects.toThrow(
        Error(`Could not find author with id '${authorId}'.`),
      );
    });
  });

  describe('updateAuthor()', () => {
    const updateAuthor: UpdateAuthorDto = {
      firstName: updatedAuthor.firstName,
      lastName: updatedAuthor.lastName,
      birthDate: updatedAuthor.birthDate,
      cityOfBirth: updatedAuthor.cityOfBirth,
    };
    it('updates an author', () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(updatedAuthor);
      expect(
        authorsService.updateAuthor(authorId, updateAuthor),
      ).resolves.toEqual(updatedAuthor);
    });
    it('throws an error, if there are empty strings in UpdateAuthorDto', () => {
      const updateAuthor: UpdateAuthorDto = {
        firstName: '',
        lastName: '',
        birthDate: '',
      };
      expect(
        authorsService.updateAuthor(authorId, updateAuthor),
      ).rejects.toThrow(
        Error('Either firstName, lastName, or birthDate must be given.'),
      );
    });
    it('throws an error, if author could not be found', () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);
      expect(
        authorsService.updateAuthor(authorId, updateAuthor),
      ).rejects.toThrow(Error(`Could not find author with id '${authorId}'.`));
    });
  });

  describe('deleteAuthor()', () => {
    it('deletes an author', () => {
      expect(authorsService.deleteAuthor(authorId)).resolves.toBeUndefined();
    });
    it('throws an error, if author does not exist', () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);
      expect(authorsService.deleteAuthor(authorId)).rejects.toThrow(
        Error(`Author with id '${authorId}' does not exist.`),
      );
    });
  });
});
