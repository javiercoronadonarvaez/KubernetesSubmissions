// import { Injectable, OnModuleInit } from '@nestjs/common';
// import { PrismaClient } from '@prisma/client';
// import { PrismaPg } from '@prisma/adapter-pg';

// const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
// const prisma = new PrismaClient({ adapter });

// @Injectable()
// export class PrismaService extends PrismaClient {
//   public client = prisma;

//   // public async onModuleInit(): Promise<void> {
//   //   await (this.$connect as () => Promise<void>)();
//   // }
// }

// // @Injectable()
// // export class PrismaService extends PrismaClient implements OnModuleInit {
// //   // Uncomment the following constructor to enable query logging, this is useful for debugging
// //   // but can be verbose in production.
// //   /*
// //   public constructor() {
// //     super({
// //       log: ['query'], // Enable query logging
// //     });
// //   }
// //   */
// //   // private adapter: PrismaPg = new PrismaPg({
// //   //   connectionString: process.env.DATABASE_URL,
// //   // });
// //   private prisma = prisma;

// //   // Removed unsafe instantiation of PrismaClient with adapter
// //   // The onModuleInit is optional — if you leave it out,
// //   // Prisma will connect lazily on its first call to the database
// //   public async onModuleInit(): Promise<void> {
// //     await (this.$connect as () => Promise<void>)();
// //   }
// // }
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import 'dotenv/config';

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaService {
  public client = prisma;
}
