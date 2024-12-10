import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MapsModule } from './maps/maps.module';
import { ConfigModule } from '@nestjs/config';
import { RoutesModule } from './routes/routes.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    // Configuração global do ConfigModule para acessar variáveis de ambiente em toda a aplicação
    ConfigModule.forRoot({
      isGlobal: true, // Torna as configurações acessíveis globalmente
    }),
    // Importa o MapsModule
    MapsModule,
    RoutesModule,
    PrismaModule,
  ],
  controllers: [AppController], // Define os controladores da aplicação
  providers: [AppService], // Define os serviços da aplicação
})
export class AppModule {}
