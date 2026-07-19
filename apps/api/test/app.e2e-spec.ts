import { Test, type TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import type { App } from 'supertest/types.js';
import { AppModule } from './../src/app.module.js';
import { PrismaService } from './../src/database/prisma.service.js';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('connects to PostgreSQL', async () => {
    const database = app.get(PrismaService);

    const result = await database.$queryRaw<Array<{ value: number }>>`
      SELECT 1 AS value
    `;

    expect(result).toEqual([{ value: 1 }]);
  });

  afterEach(async () => {
    await app.close();
  });
});
