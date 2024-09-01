import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PublishersService } from '../src/publishers/publishers.service';

describe('Publishers (e2e)', () => {
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

  let app: INestApplication;

  const publishersService = {
    createPublisher: () => publisher,
    getAllPublishers: () => {
      return { data: [publisher], metaInformation };
    },
    getPublisherById: () => publisher,
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PublishersService)
      .useValue(publishersService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('creates a publisher', () => {
    return request(app.getHttpServer())
      .post('/publishers')
      .send(publisherName)
      .expect(201)
      .expect(publishersService.createPublisher());
  });

  it('gets all publishers', () => {
    return request(app.getHttpServer())
      .get('/publishers')
      .expect(200)
      .expect(publishersService.getAllPublishers());
  });

  it('gets a publisher', () => {
    return request(app.getHttpServer())
      .get(`/publishers/${publisherId}`)
      .expect(200)
      .expect(publishersService.getPublisherById());
  });
});
