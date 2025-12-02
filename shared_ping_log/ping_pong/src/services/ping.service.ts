import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class PingInternalService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async getCounter(): Promise<string> {
    const latest = await this.prismaService.counter.findFirst({
      orderBy: { id: 'desc' },
    });
    return latest ? latest.message : 'No counter found';
  }
}
