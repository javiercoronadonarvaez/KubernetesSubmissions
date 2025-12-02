import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import 'dotenv/config';

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
// const prisma = new PrismaClient({ adapter });

@Injectable()
export class PrismaService extends PrismaClient {
  public constructor() {
    super({ adapter });
  }
}
