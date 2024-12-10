import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  // Conexão com o banco de dados ao iniciar o módulo
  async onModuleInit() {
    await this.$connect();
    console.log('Prisma Client conectado ao banco de dados.');
  }

  // Fecha a conexão com o banco ao destruir o módulo
  async onModuleDestroy() {
    await this.$disconnect();
    console.log('Prisma Client desconectado do banco de dados.');
  }
}
