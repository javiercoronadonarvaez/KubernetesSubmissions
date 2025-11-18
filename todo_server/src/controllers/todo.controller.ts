import { Controller, Get, Res, HttpStatus, Post, Body } from '@nestjs/common';
import type { Response } from 'express';
import { TodoService } from 'src/services/todo.service';

@Controller()
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get('todos')
  async getTodos(@Res() res: Response) {
    const todos = await this.todoService.getTodos();
    if (!todos) {
      return res.status(HttpStatus.NOT_FOUND).send('Todos not found');
    }
    res.json(todos);
  }

  @Post('todos')
  async createTodo(@Body() body: { title: string }, @Res() res: Response) {
    const todo = await this.todoService.createTodo(body.title);
    if (!todo) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send('Failed to create todo');
    }
    res.json({ message: 'Todo created successfully', todo });
  }
}
