import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { DirectionsService } from './directions.service';

@Controller('directions')
export class DirectionsController {
  constructor(private readonly directionsService: DirectionsService) {}

  @Get()
  async getDirections(
    @Query('originId') originId: string,
    @Query('destinationId') destinationId: string,
  ) {
    if (!originId || !destinationId) {
      throw new BadRequestException('Os parâmetros "originId" e "destinationId" são obrigatórios.');
    }

    return await this.directionsService.getDirection(originId, destinationId);
  }
}
