import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ImageService } from './services/image.service';
import { ValidationPipe } from '@nestjs/common';
import 'dotenv/config';

const BACKEND_PORT = process.env.BACKEND_PORT || '3000';

const bootstrap = async (): Promise<void> => {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(Number(BACKEND_PORT));
  const logger = new Logger('Bootstrap');
  logger.log(`Server started on port ${BACKEND_PORT}`);

  // Get the ImageService instance from the app context
  const imageService = app.get(ImageService);
  if (await imageService.getImageFromFile()) {
    logger.log('Fetched from shared local image ON STARTUP');
  } else {
    await imageService.getRemoteImageStream();
    logger.log('Fetched and saved remote image ON STARTUP');
  }

  // Call getRemoteImageStream every 10 minutes
  setInterval(() => {
    void (async () => {
      try {
        await imageService.getRemoteImageStream();
        logger.log('Fetched and saved remote image');
      } catch (err) {
        logger.error('Failed to fetch remote image', err);
      }
    })();
  }, 600000);
};

bootstrap().catch(console.error);
