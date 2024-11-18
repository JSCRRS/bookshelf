import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';

describe('Health (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('checks health for http and returns OK', () => {
    request(app.getHttpServer()).get('/health').expect(200);
  });

  it('checks health for db and returns OK', () => {
    request(app.getHttpServer()).get('/health/db').expect(200);
  });
});
