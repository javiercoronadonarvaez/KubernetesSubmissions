import { Injectable, OnModuleInit } from '@nestjs/common';
import { writeToFile, getFile, getLastLine } from '../utils/logs';
import path from 'path';

@Injectable()
export class LogsService implements OnModuleInit {
  private directory = path.join('/', 'usr', 'src', 'app', 'files');
  private filePath = path.join(this.directory, 'output.txt');

  async onModuleInit() {
    await writeToFile(this.directory, this.filePath);
  }

  public getRandomString = async (): Promise<string> => {
    const textFile = await getFile(this.filePath);
    const lastLine = getLastLine(textFile);
    return lastLine;
  };
}
