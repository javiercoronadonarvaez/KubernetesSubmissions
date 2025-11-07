import { Controller, Get } from '@nestjs/common';
import { PingPongService } from '../services/pingpong.service';
import { ApiResponse } from '@nestjs/swagger';

@Controller('pingpong')
export class PingPongController {
  constructor(private readonly pingPongService: PingPongService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Ping Pong Response', type: String })
  getCounter(): string {
    return this.pingPongService.getCounter();
  }
}
