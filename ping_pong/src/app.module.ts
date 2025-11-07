import { Module } from '@nestjs/common';
import { PingPongController } from './controllers/pingpong.controller';
import { PingPongService } from './services/pingpong.service';

@Module({
  imports: [],
  controllers: [PingPongController],
  providers: [PingPongService],
})
export class AppModule {}
