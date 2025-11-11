import { Injectable, OnModuleInit } from '@nestjs/common';
import { writeToFile, getFile, getLastLine, getCounter } from '../utils/logs';
import path from 'path';

@Injectable()
export class LogsService implements OnModuleInit {
  private directory = path.join('/', 'usr', 'src', 'app', 'files');
  private logsFilePath = path.join(this.directory, 'log_output.txt');
  private pingPongFilePath = path.join(this.directory, 'ping_pong_output.txt');

  async onModuleInit() {
    await writeToFile(this.directory, this.logsFilePath);
  }

  public getRandomString = async (): Promise<string> => {
    const textFile = await getFile(this.logsFilePath);
    const lastLine = getLastLine(textFile);
    const pingPongFile = await getFile(this.pingPongFilePath);
    const counterMessage = getCounter(pingPongFile);
    const combinedMessage = `${lastLine}\nPing Pong Message: ${counterMessage}`;
    return combinedMessage;
  };
}
