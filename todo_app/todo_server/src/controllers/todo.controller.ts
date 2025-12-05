import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Post,
  Body,
  Logger,
} from '@nestjs/common';
import { CreateTodoDto } from '../dto/create-todo.dto';
import type { Response } from 'express';
import { TodoService } from 'src/services/todo.service';

@Controller('todos')
export class TodoController {
  private readonly logger = new Logger(TodoController.name);

  constructor(private readonly todoService: TodoService) {}

  @Get()
  async getTodos(@Res() res: Response) {
    const todos = await this.todoService.getTodos();
    if (!todos) {
      this.logger.log(`Unable to fetch todos`);
      return res.status(HttpStatus.NOT_FOUND).send('Todos not found');
    }
    res.json(todos);
    this.logger.log(`Fetched todos`);
  }

  @Post()
  async createTodo(@Body() createTodoDto: CreateTodoDto, @Res() res: Response) {
    const todo = await this.todoService.createTodo(createTodoDto.todo);
    this.logger.log(`Created todo: ${todo}`);
    res.json({ message: 'Todo created successfully', todo });
  }
}
