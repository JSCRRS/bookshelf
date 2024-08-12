/* eslint @typescript-eslint/no-unused-vars: 0 */

import { Test, TestingModule } from '@nestjs/testing';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Author } from './author.entity';
import { Repository, UpdateResult } from 'typeorm';
import { UpdateAuthorDto } from './dto/update-author.dto';

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

const updatedAuthor = {
  id: authorId,
  firstName: 'C',
  lastName: 'D',
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
            find: jest.fn().mockResolvedValue([author]),
            findOneBy: jest.fn().mockResolvedValue(null),
            update: jest.fn().mockResolvedValue(updatedAuthor),
          },
        },
      ],
    }).compile();

    authorsService = module.get<AuthorsService>(AuthorsService);
    repository = module.get<Repository<Author>>(getRepositoryToken(Author));
  });

  describe('createAuthor()', () => {
    it('saves and returns an author', () => {
      expect(authorsService.createAuthor(authorFirstLastName)).resolves.toEqual(
        author,
      );
    });
    it('throws an error, if author already exists', () => {
      const repoSpy = jest
        .spyOn(repository, 'findOneBy')
        .mockResolvedValue(author);
      expect(authorsService.createAuthor(authorFirstLastName)).rejects.toEqual(
        Error("Author with name 'A B' already exists."),
      );
    });
  });

  describe('getAllAuthors()', () => {
    it('gets all authors', () => {
      const repoSpy = jest
        .spyOn(repository, 'find')
        .mockResolvedValue([author]);
      expect(authorsService.getAllAuthors()).resolves.toEqual([author]);
    });
  });

  describe('getAuthorById()', () => {
    it('gets and returns an author by id', () => {
      const repoSpy = jest
        .spyOn(repository, 'findOneBy')
        .mockResolvedValue(author);
      expect(authorsService.getAuthorById(authorId)).resolves.toEqual(author);
    });
    it('throws an error, if author does not exist', () => {
      expect(authorsService.getAuthorById(authorId)).rejects.toEqual(
        Error(`Could not find author with id '${authorId}'.`),
      );
    });
  });

  describe('updateAuthor()', () => {
    const updateAuthor: UpdateAuthorDto = {
      firstName: updatedAuthor.firstName,
      lastName: updatedAuthor.lastName,
    };
    it('updates an author', () => {
      const repoSpy = jest
        .spyOn(repository, 'findOneBy')
        .mockResolvedValue(updatedAuthor);
      expect(
        authorsService.updateAuthor(authorId, updateAuthor),
      ).resolves.toEqual(updatedAuthor);
    });
    it('throws an error, if there are empty strings in UpdateAuthorDto', () => {
      const updateAuthor: UpdateAuthorDto = {
        firstName: '',
        lastName: '',
      };
      expect(
        authorsService.updateAuthor(authorId, updateAuthor),
      ).rejects.toEqual(Error('Either firstName or lastName must be given.'));
    });
    it('throws an error, if author could not be found', () => {
      expect(
        authorsService.updateAuthor(authorId, updateAuthor),
      ).rejects.toEqual(Error(`Could not find author with id '${authorId}'.`));
    });
  });

  describe('deleteAuthor()', () => {
    it('deletes an author', () => {
      const repoSpy = jest
        .spyOn(repository, 'findOneBy')
        .mockResolvedValue(author);
      expect(authorsService.deleteAuthor(authorId)).resolves.toBeUndefined();
    });
    it('throws an error, if author does not exist', () => {
      const reppSpy = jest
        .spyOn(repository, 'findOneBy')
        .mockResolvedValue(null);
      expect(authorsService.deleteAuthor(authorId)).rejects.toEqual(
        Error(`Author with id '${authorId}' does not exist.`),
      );
    });
  });
});
