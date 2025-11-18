import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { ImageController } from './controllers/image.controller';
import { ImageService } from './services/image.service';
import { TodoService } from './services/todo.service';
import { TodoController } from './controllers/todo.controller';

@Module({
  imports: [],
  controllers: [AppController, ImageController, TodoController],
  providers: [AppService, ImageService, TodoService],
})
export class AppModule {}
