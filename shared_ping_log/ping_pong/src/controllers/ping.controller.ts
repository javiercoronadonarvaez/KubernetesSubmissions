import { Controller, Get, Logger } from '@nestjs/common';
import { PingInternalService } from '../services/ping.service';
import { ApiResponse } from '@nestjs/swagger';

@Controller('ping')
export class PingInternalController {
  private readonly logger = new Logger(PingInternalController.name);
  public constructor(
    private readonly pingInternalService: PingInternalService,
  ) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Ping Pong Response', type: String })
  async getCounter(): Promise<string> {
    this.logger.log('Fetching ping pong counter');
    return this.pingInternalService.getCounter();
  }
}
