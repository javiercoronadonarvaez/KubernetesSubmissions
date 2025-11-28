import { Module } from '@nestjs/common';
import { ImageController } from './controllers/image.controller';
import { ImageService } from './services/image.service';
import { TodoService } from './services/todo.service';
import { TodoController } from './controllers/todo.controller';

@Module({
  imports: [],
  controllers: [ImageController, TodoController],
  providers: [ImageService, TodoService],
})
export class AppModule {}
