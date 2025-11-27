import { Module } from '@nestjs/common';
import { LogsController } from './controllers/logs.controller';
import { LogsService } from './services/logs.service';

@Module({
  imports: [],
  controllers: [LogsController],
  providers: [LogsService],
})
export class AppModule {}
