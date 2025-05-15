import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "prisma/__generated__";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  onModuleInit() {
    this.$connect;
    console.log('Postgre OK');
  }

  onModuleDestroy() {
    this.$disconnect;
  }
}
