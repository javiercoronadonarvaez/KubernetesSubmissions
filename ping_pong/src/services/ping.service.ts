import { Injectable, OnModuleInit } from '@nestjs/common';
import { createDirectory, getFile, getCounter } from '../utils/pingpong';
import path from 'path';

@Injectable()
export class PingInternalService implements OnModuleInit {
  private directory = path.join('/', 'usr', 'src', 'app', 'files');
  private filePath = path.join(this.directory, 'ping_pong_output.txt');

  async onModuleInit() {
    await createDirectory(this.directory);
  }

  public getCounter = async (): Promise<string> => {
    const textFile = await getFile(this.filePath);
    const counterMessage = await getCounter(textFile, this.filePath);
    return counterMessage;
  };
}
