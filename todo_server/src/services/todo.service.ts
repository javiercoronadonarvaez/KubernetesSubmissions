import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import fs from 'fs';
import path from 'path';

@Injectable()
export class TodoService {
  private readonly logger = new Logger(TodoService.name);
  private directory = path.join('/', 'usr', 'src', 'app', 'files');
  private filePath = path.join(this.directory, 'todo_list.txt');

  //   public writeToFile = async (
  //     filePath: string,
  //     counterEntry: string,
  //   ): Promise<void> => {
  //     await new Promise<void>((response, reject) => {
  //       fs.writeFile(filePath, counterEntry, (err) => {
  //         if (err) {
  //           this.logger.error('Failed to append to file:', err);
  //           return reject(err);
  //         }
  //         response();
  //       });
  //     });
  //   };

  public getTodos = async (): Promise<string[]> => {
    return new Promise((response, reject) => {
      fs.readFile(this.filePath, 'utf8', (err, data) => {
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

  public createTodo = async (title: string): Promise<string> => {
    this.logger.log(`Creating todo with title: ${title}`);
    await new Promise<void>((response, reject) => {
      fs.appendFile(this.filePath, title + '\n', (err) => {
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
