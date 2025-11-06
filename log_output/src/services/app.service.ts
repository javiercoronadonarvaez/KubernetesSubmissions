import { Injectable } from '@nestjs/common';
import { generateUUID } from '../utils/uuid';

@Injectable()
export class AppService {
  public getRandomString(): string {
    const randomString = generateUUID();
    const timestamp = new Date().toISOString();
    const output = `${timestamp}: ${randomString}`;
    console.log(output);
    return output;
  }
}
