import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { PlacesService } from './places.service';

@Controller('places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @Get()
  async findPlaces(@Query('text') text: string) {
    if (!text) {
      throw new BadRequestException('O parâmetro "text" é obrigatório');
    }

    return await this.placesService.findPlaces(text);
  }
}
