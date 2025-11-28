import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import fs from 'fs';

const TODO_LIST_FILE_PATH = process.env.TODO_LIST_FILE_PATH || '/todo_list.txt';

@Injectable()
export class TodoService {
  private readonly logger = new Logger(TodoService.name);

  /**
   * Fetches the list of todos from the todo_list.txt file.
   */
  public getTodos = async (): Promise<string[]> => {
    return new Promise((response, reject) => {
      fs.readFile(TODO_LIST_FILE_PATH, 'utf8', (err, data) => {
        if (err) {
          if (err.code === 'ENOENT') return response([]);
          this.logger.error('FAILED TO READ FILE', err);
          return reject(err);
        }
        const todos = data.split('\n').filter((line) => line.trim() !== '');
        response(todos);
      });
    });
  };

  /**
   * Adds a new todo to the todo_list.txt file.
   */
  public createTodo = async (title: string): Promise<string> => {
    this.logger.log(`Creating todo with title: ${title}`);
    await new Promise<void>((response, reject) => {
      fs.appendFile(TODO_LIST_FILE_PATH, title + '\n', (err) => {
        if (err) {
          this.logger.error('Failed to append to file:', err);
          return reject(err);
        }
        response();
      });
    });
    return `${title}`;
  };
}
