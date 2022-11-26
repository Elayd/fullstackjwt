import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '.prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      datasources: {
        db: {
          url: 'postgres://vwaskgymmtjsut:bafdfa5cba57be624ad9e593388f6d8feb5d39f58e2837faaf3a8c96390ec04b@ec2-34-248-169-69.eu-west-1.compute.amazonaws.com:5432/d54p3r4f6n2309',
        },
      },
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
