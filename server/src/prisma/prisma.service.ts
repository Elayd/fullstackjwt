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
          url: 'postgres://postgresql_odii_user:RMLiuhhe8nnwT8zMTiHfD8RoVPjePdut@dpg-ce2i1iha6gdvdcnmkrsg-a.frankfurt-postgres.render.com/postgresql_odii',
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
