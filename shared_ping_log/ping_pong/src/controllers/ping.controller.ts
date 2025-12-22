import { Controller, Get, Logger, Res } from '@nestjs/common';
import type { Response } from 'express';
import { PingInternalService } from '../services/ping.service';
import { ApiResponse } from '@nestjs/swagger';

@Controller()
export class PingInternalController {
  private readonly logger = new Logger(PingInternalController.name);
  public constructor(
    private readonly pingInternalService: PingInternalService,
  ) {}

  // Root path handler for Ingress health check on port 3001
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Ping Pong Healthcheck',
    type: String,
  })
  getReady(@Res() res: Response): void {
    res.status(200).send('OK');
  }

  @Get('ping')
  @ApiResponse({ status: 200, description: 'Ping Pong Response', type: String })
  async getCounter(): Promise<string> {
    this.logger.log('Fetching ping pong counter');
    return this.pingInternalService.getCounter();
  }
}
