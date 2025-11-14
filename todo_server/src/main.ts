import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ImageService } from './services/image.service'; // Import your service
import 'dotenv/config';

const bootstrap = async (): Promise<void> => {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ? Number(process.env.PORT) : 3300;
  await app.listen(port);
  const logger = new Logger('Bootstrap');
  logger.log(`Server started on port ${port}`);

  // Get the ImageService instance from the app context
  const imageService = app.get(ImageService);
  await imageService.getRemoteImageStream();
  logger.log('Fetched and saved remote image ON STARTUP');

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
  }, 600000); // adjust interval as needed
};

bootstrap().catch(console.error);
