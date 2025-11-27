import { Injectable } from '@nestjs/common';
import { getFile, getLastLine } from '../utils/logs';
import path from 'path';
import axios from 'axios';

const AXIOS_PING_BACKEND_URL =
  process.env.AXIOS_PING_KUBERNETES_BACKEND_URL ||
  'http://shared-ping-log-svc:3001/ping';

@Injectable()
export class LogsService {
  private directory = path.join('/', 'usr', 'src', 'app', 'files');
  private logsFilePath = path.join(this.directory, 'log_output.txt');
  private configDirectory = path.join('/', 'usr', 'src', 'app', 'config');
  private configFilePath = path.join(this.configDirectory, 'information.txt');

  private getPingPongMessage = async (): Promise<string> => {
    const response = await axios.get(AXIOS_PING_BACKEND_URL);
    return response.data as string;
  };

  public getRandomString = async (): Promise<string> => {
    const informationTextFile = await getFile(this.configFilePath);
    const informationTextMessage = getLastLine(informationTextFile);
    const textFile = await getFile(this.logsFilePath);
    const lastLine = getLastLine(textFile);
    const pingPongMessage = await this.getPingPongMessage();
    const combinedMessage = `file content: ${informationTextMessage}\n${lastLine}\nPing Pong Message: ${pingPongMessage}`;
    return combinedMessage;
  };
}
