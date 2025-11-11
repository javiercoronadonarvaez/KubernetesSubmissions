import { Controller, Get } from '@nestjs/common';
import { LogsService } from '../services/logs.service';

@Controller()
export class LogsController {
  public constructor(private readonly logsService: LogsService) {}

  @Get()
  async getRandomString(): Promise<string> {
    return await this.logsService.getRandomString();
  }
}
