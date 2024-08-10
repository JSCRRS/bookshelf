/* eslint @typescript-eslint/no-unused-vars: 0 */

import { Test, TestingModule } from '@nestjs/testing';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Author } from './author.entity';
import { Repository } from 'typeorm';

const oneAuthor = {
  firstName: 'A',
  lastName: 'B',
};

const authorId = '111aa111-a11a-111a-a111-11111a111a11';

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
            save: jest.fn().mockResolvedValue(oneAuthor),
            delete: jest.fn(),
            findOneBy: jest.fn().mockResolvedValue(null),
          },
        },
      ],
    }).compile();

    authorsService = module.get<AuthorsService>(AuthorsService);
    repository = module.get<Repository<Author>>(getRepositoryToken(Author));
  });

  describe('createAuthor()', () => {
    const author: CreateAuthorDto = {
      firstName: 'A',
      lastName: 'B',
    };
    it('saves and returns an author', () => {
      expect(authorsService.createAuthor(author)).resolves.toEqual(oneAuthor);
    });
    it('throws an error, if author already exists', () => {
      const repoSpy = jest
        .spyOn(repository, 'findOneBy')
        .mockResolvedValue({ id: authorId, ...oneAuthor });
      expect(authorsService.createAuthor(author)).rejects.toEqual(
        Error("Author with name 'A B' already exists."),
      );
    });
  });

  describe('getAuthorById()', () => {
    it('gets and returns an author by id', () => {
      const repoSpy = jest
        .spyOn(repository, 'findOneBy')
        .mockResolvedValue({ id: authorId, ...oneAuthor });
      expect(authorsService.getAuthorById(authorId)).resolves.toEqual({
        id: authorId,
        ...oneAuthor,
      });
    });
    it('throws an error, if author does not exist', () => {
      expect(authorsService.getAuthorById(authorId)).rejects.toEqual(
        Error(`Could not find author with id '${authorId}'.`),
      );
    });
  });

  describe('deleteAuthor()', () => {
    it('deletes an author', () => {
      const repoSpy = jest
        .spyOn(repository, 'findOneBy')
        .mockResolvedValue({ id: authorId, ...oneAuthor });
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
