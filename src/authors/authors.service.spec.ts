import { Test, TestingModule } from '@nestjs/testing';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Author } from './author.entity';
import { Repository } from 'typeorm';

const oneAuthor = {
  id: '1',
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
          },
        },
      ],
    }).compile();

    authorsService = module.get<AuthorsService>(AuthorsService);
    repository = module.get<Repository<Author>>(getRepositoryToken(Author));
  });

  describe('create author', () => {
    it('saves and returns an author', async () => {
      const author: CreateAuthorDto = {
        firstName: 'A',
        lastName: 'B',
      };
      expect(await authorsService.createAutor(author)).toBe(oneAuthor);
    });
  });
});
