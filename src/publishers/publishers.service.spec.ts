import { Repository } from 'typeorm';
import { PublishersService } from './publishers.service';
import { Publisher } from './publisher.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConflictException, HttpException, HttpStatus } from '@nestjs/common';
import { PaginationOptionsDto } from 'src/pagination/PaginationOptionsDto';
import { UpdatePublisherDto } from './dto/update-publisher.dto';

const publisherName = 'A';

const publisherId = '111aa111-a11a-111a-a111-11111a111a11';

const publisher = {
  id: publisherId,
  name: publisherName,
};

const updatedPublisher = {
  id: publisherId,
  name: 'B',
  city: null,
  country: null,
  books: [],
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
            findOneBy: jest.fn().mockResolvedValue(publisher),
            findOne: jest.fn().mockResolvedValue(publisher),
            update: jest.fn().mockResolvedValue(updatedPublisher),
            delete: jest.fn(),
            createQueryBuilder: jest.fn().mockReturnValue({
              orderBy: jest.fn().mockReturnThis(),
              skip: jest.fn().mockReturnThis(),
              take: jest.fn().mockReturnThis(),
              getCount: jest.fn().mockReturnValue(1),
              getMany: jest.fn().mockResolvedValue([publisher]),
            }),
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

  describe('getAllPublishers()', () => {
    it('gets all publishers', () => {
      const queryParams: PaginationOptionsDto = {
        currentPage: 1,
        itemsPerPage: 1,
        skipNumberOfPages: 0,
      };
      expect(publishersService.getAllPublishers(queryParams)).resolves.toEqual({
        data: [publisher],
        metaInformation,
      });
    });
  });

  describe('getPublisherById()', () => {
    it('gets and returns a publisher by id', async () => {
      await expect(
        publishersService.getPublisherById(publisherId),
      ).resolves.toEqual(publisher);
    });
    it('throws an error, if publisher does not exist', () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);
      expect(publishersService.getPublisherById(publisherId)).rejects.toThrow(
        Error(`Could not find publisher with id '${publisherId}'.`),
      );
    });
  });

  describe('updatePublisher()', () => {
    const updatePublisher: UpdatePublisherDto = {
      name: updatedPublisher.name,
    };
    it('updates a publisher', () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(updatedPublisher);
      expect(
        publishersService.updatePublisher(publisherId, updatePublisher),
      ).resolves.toEqual(updatedPublisher);
    });
    it('throws an error, if there are empty strings in UpdatePublisherDto', () => {
      const updatePublisher: UpdatePublisherDto = {
        name: '',
        city: '',
        country: '',
      };
      expect(
        publishersService.updatePublisher(publisherId, updatePublisher),
      ).rejects.toThrow(Error('Either name, city, or country must be given.'));
    });
    it('throws an error, if publisher could not be found', () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);
      expect(
        publishersService.updatePublisher(publisherId, updatePublisher),
      ).rejects.toThrow(
        Error(`Could not find publisher with id '${publisherId}'.`),
      );
    });
  });

  describe('deletePublisher', () => {
    it('deletes a publisher', () => {
      expect(
        publishersService.deletePublisher(publisherId),
      ).resolves.toBeUndefined();
    });
    it('throws an error, if publisher could not be found', () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);
      expect(publishersService.deletePublisher(publisherId)).rejects.toThrow(
        Error(`Publisher with id '${publisherId}' does not exist.`),
      );
    });
  });
});
