import { Injectable } from '@nestjs/common';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { DirectionsService } from 'src/maps/directions/directions.service';

@Injectable()
export class RoutesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly directionsService: DirectionsService,
  ) {}

  async create(createRouteDto: CreateRouteDto) {
    try {
      // Chama o DirectionsService para obter informações da rota
      console.log(createRouteDto)
      const {
        available_travel_modes,
        geocoded_waypoints,
        routes,
        request,
      } = await this.directionsService.getDirection(
        createRouteDto.source_id,
        createRouteDto.destination_id,
      );

      // Verifica se as rotas estão disponíveis
      if (!routes || routes.length === 0) {
        throw new Error('Nenhuma rota encontrada.');
      }

      // Usa o primeiro trecho (leg) da primeira rota
      const legs = routes[0].legs[0];

      // Serializa os dados do campo directions
      const serializedDirections = JSON.parse(
        JSON.stringify({
          available_travel_modes,
          geocoded_waypoints,
          routes,
          request,
        }),
      );

      // Cria a nova rota no banco de dados
      return this.prismaService.route.create({
        data: {
          name: createRouteDto.name,
          source: {
            name: legs.start_address,
            location: {
              lat: legs.start_location.lat,
              lng: legs.start_location.lng,
            },
          },
          destination: {
            name: legs.end_address,
            location: {
              lat: legs.end_location.lat,
              lng: legs.end_location.lng,
            },
          },
          duration: legs.duration.value,
          distance: legs.distance.value,
          directions: serializedDirections,
        },
      });
    } catch (error) {
      throw new Error(`Erro ao criar a rota: ${error.message}`);
    }
  }

  async findAll() {
    return this.prismaService.route.findMany();
  }

  async findOne(id: string) {
    return this.prismaService.route.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateRouteDto: UpdateRouteDto) {
    return this.prismaService.route.update({
      where: { id },
      data: updateRouteDto,
    });
  }

  async remove(id: string) {
    return this.prismaService.route.delete({
      where: { id },
    });
  }
}
