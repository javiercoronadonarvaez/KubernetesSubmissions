import { Injectable } from '@nestjs/common';

@Injectable()
export class PingPongService {
  private counter = 0;
  private increamentCounter = this.counter;

  getCounter(): string {
    this.counter = this.increamentCounter;
    this.increamentCounter += 1;
    const output = `pong ${this.counter.toString()}`;
    return output;
  }
}
