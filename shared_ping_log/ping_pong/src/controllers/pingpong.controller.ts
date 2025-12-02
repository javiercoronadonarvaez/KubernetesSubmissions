import { Controller, Get, Logger } from '@nestjs/common';
import { PingPongService } from '../services/pingpong.service';
import { ApiResponse } from '@nestjs/swagger';

@Controller('pingpong')
export class PingPongController {
  private readonly logger = new Logger(PingPongController.name);
  public constructor(private readonly pingPongService: PingPongService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Ping Pong Response', type: String })
  async incrementCounter(): Promise<string> {
    this.logger.log('Incrementing ping pong counter');
    return this.pingPongService.incrementCounter();
  }
}
