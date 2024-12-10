import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RoutesDriverService {
  constructor(private readonly prismaService: PrismaService) {}

  async processRoute(dto: { route_id: string; lat: number; lng: number }) {
    // Verifica se o RouteDriver já existe
    const existingRouteDriver = await this.prismaService.routeDriver.findUnique({
      where: { route_id: dto.route_id },
    });

    if (existingRouteDriver) {
      // Adiciona o novo ponto aos pontos existentes usando `create`
      return this.prismaService.routeDriver.update({
        where: { route_id: dto.route_id },
        data: {
          points: {
            create: {
              location: {
                lat: dto.lat,
                lng: dto.lng,
              },
            },
          },
        },
        include: {
          route: true,
        },
      });
    } else {
      // Cria um novo RouteDriver com o ponto inicial
      return this.prismaService.routeDriver.create({
        data: {
          route_id: dto.route_id,
          points: {
            create: {
              location: {
                lat: dto.lat,
                lng: dto.lng,
              },
            },
          },
        },
        include: {
          route: true,
        },
      });
    }
  }
}
