import { Injectable } from '@nestjs/common';
import { getFile, getCounter } from '../utils/pingpong';
import path from 'path';

@Injectable()
export class PingPongService {
  private directory = path.join('/', 'usr', 'src', 'app', 'files');
  private filePath = path.join(this.directory, 'ping_pong_output.txt');

  public getCounter = async (): Promise<string> => {
    const textFile = await getFile(this.filePath);
    const counterMessage = await getCounter(textFile, this.filePath);
    return counterMessage;
  };
}
