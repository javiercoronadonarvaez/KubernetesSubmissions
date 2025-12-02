import { Module } from '@nestjs/common';
import { ImageController } from './controllers/image.controller';
import { ImageService } from './services/image.service';
import { TodoService } from './services/todo.service';
import { TodoController } from './controllers/todo.controller';
import { PrismaService } from './services/prisma.service';

@Module({
  imports: [],
  controllers: [ImageController, TodoController],
  providers: [ImageService, TodoService, PrismaService],
})
export class AppModule {}
