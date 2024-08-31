import { Repository } from 'typeorm';
import { PublishersService } from './publishers.service';
import { Publisher } from './publisher.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConflictException, HttpException, HttpStatus } from '@nestjs/common';

const publisherName = 'A';

const publisherId = '111aa111-a11a-111a-a111-11111a111a11';

const publisher = {
  id: publisherId,
  name: publisherName,
};

const metaInformation = {
  currentPage: 1,
  itemsPerPage: 1,
  numberOfAllItems: 1,
  numberOfAllPages: 1,
};

describe('PublishersService', () => {
  let publishersService: PublishersService;
  let repository: Repository<Publisher>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PublishersService,
        {
          provide: getRepositoryToken(Publisher),
          useValue: {
            save: jest.fn().mockResolvedValue(publisher),
          },
        },
      ],
    }).compile();

    publishersService = module.get<PublishersService>(PublishersService);
    repository = module.get<Repository<Publisher>>(
      getRepositoryToken(Publisher),
    );
  });

  describe('createPublisher()', () => {
    it('saves and returns a publisher', () => {
      expect(
        publishersService.createPublisher({ name: publisherName }),
      ).resolves.toEqual(publisher);
    });
    it('throws an error, if publisher already exists', () => {
      const error = {
        code: 'ER_DUP_ENTRY',
      };
      jest.spyOn(repository, 'save').mockRejectedValue(error);
      expect(
        publishersService.createPublisher({ name: publisherName }),
      ).rejects.toThrow(
        new ConflictException(
          `Publisher with name '${publisherName}' already exists.`,
        ),
      );
    });
    it('throws an unspecified error, if something else went wrong', () => {
      jest.spyOn(repository, 'save').mockRejectedValue(Error('Error!'));
      expect(
        publishersService.createPublisher({ name: publisherName }),
      ).rejects.toThrow(
        new HttpException('Something went wrong...', HttpStatus.BAD_REQUEST),
      );
    });
  });
});
