import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class PingPongService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async incrementCounter(): Promise<string> {
    const latest = await this.prismaService.counter.findFirst({
      orderBy: { id: 'desc' },
    });
    let current = -1;
    if (latest && latest.message) {
      const match = latest.message.match(/Ping \/ Pongs: (\d+)/);
      if (match) {
        current = parseInt(match[1], 10);
      }
    }
    const newValue = current + 1;
    const formattedValue = `Ping / Pongs: ${newValue}`;
    await this.prismaService.counter.create({
      data: { message: formattedValue },
    });
    return formattedValue;
  }
}
