import { Injectable, OnModuleInit } from '@nestjs/common';

import { PrismaClient } from '../../generated/prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  // Uncomment the following constructor to enable query logging, this is useful for debugging
  // but can be verbose in production.
  /*
  public constructor() {
    super({
      log: ['query'], // Enable query logging
    });
  }
  */

  // The onModuleInit is optional — if you leave it out,
  // Prisma will connect lazily on its first call to the database
  public async onModuleInit(): Promise<void> {
    await this.$connect();
  }
}
