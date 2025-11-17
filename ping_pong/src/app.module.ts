import { Module } from '@nestjs/common';
import { PingPongController } from './controllers/pingpong.controller';
import { PingPongService } from './services/pingpong.service';
import { PingInternalService } from './services/ping.service';
import { PingInternalController } from './controllers/ping.controller';

@Module({
  imports: [],
  controllers: [PingPongController, PingInternalController],
  providers: [PingPongService, PingInternalService],
})
export class AppModule {}
