import { Controller, Get } from '@nestjs/common';
import { PingInternalService } from '../services/ping.service';
import { ApiResponse } from '@nestjs/swagger';

@Controller('ping')
export class PingInternalController {
  constructor(private readonly pingInternalService: PingInternalService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Ping Pong Response', type: String })
  async getCounter(): Promise<string> {
    return this.pingInternalService.getCounter();
  }
}
