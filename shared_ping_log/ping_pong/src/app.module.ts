import { Module } from '@nestjs/common';
import { PingPongController } from './controllers/pingpong.controller';
import { PingPongService } from './services/pingpong.service';
import { PrismaService } from './services/prisma.service';
import { PingInternalService } from './services/ping.service';
import { PingInternalController } from './controllers/ping.controller';

@Module({
  imports: [],
  controllers: [PingPongController, PingInternalController],
  providers: [PrismaService, PingPongService, PingInternalService],
})
export class AppModule {}
