import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common';

import { PrismaService } from './prisma.service';

@Injectable()
export class TodoService {
  private readonly logger = new Logger(TodoService.name);

  public constructor(private readonly prisma: PrismaService) {}

  /**
   * Fetches the list of todos from the Postgres database using Prisma.
   * Returns an array of todo strings.
   */
  public async getTodos(): Promise<string[]> {
    const todos = await this.prisma.todo.findMany();
    this.logger.log(`Fetched ${todos.length} todos`);
    return todos.map((todo) => todo.todo);
  }

  /**
   * Adds a new todo to the Postgres database using Prisma.
   * Returns the created todo string.
   */
  public async createTodo(title: string): Promise<string> {
    this.logger.log(`Received todo: ${title}`);
    const newTodo = await this.prisma.todo.create({
      data: { todo: title },
    });
    this.logger.log(`Created new todo with title: ${title}`);
    return newTodo.todo;
  }
}
