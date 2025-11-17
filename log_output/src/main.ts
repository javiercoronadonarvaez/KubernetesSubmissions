import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { writeLogsToFile } from './utils/logs';
import 'dotenv/config';

const bootstrap = async (): Promise<void> => {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ? Number(process.env.PORT) : 3300;
  writeLogsToFile('/usr/src/app/files/log_output.txt');
  await app.listen(port);
  const logger = new Logger('Bootstrap');
  logger.log(`Server started on port ${port}`);
};
bootstrap().catch(console.error);
