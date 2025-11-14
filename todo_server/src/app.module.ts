import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { ImageController } from './controllers/image.controller';
import { ImageService } from './services/image.service';

@Module({
  imports: [],
  controllers: [AppController, ImageController],
  providers: [AppService, ImageService],
})
export class AppModule {}
