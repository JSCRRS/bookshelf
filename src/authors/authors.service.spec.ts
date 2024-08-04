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

describe('AuthorsController', () => {
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
      expect(authorsService.createAutor(author)).resolves.toEqual(oneAuthor);
    });
    it('throws an error, if author already exists', () => {
      const repoSpy = jest
        .spyOn(repository, 'findOneBy')
        .mockResolvedValue({ id: '1', ...oneAuthor });
      expect(authorsService.createAutor(author)).rejects.toEqual(
        Error("Author with name 'A B' already exists."),
      );
    });
  });
});
