import { Injectable } from '@nestjs/common';
import { Client as GoogleMapsClient, PlaceInputType } from '@googlemaps/google-maps-services-js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PlacesService {
  constructor(
    private readonly googleMapsClient: GoogleMapsClient, // Injeção do cliente Google Maps
    private readonly configService: ConfigService, // Injeção do serviço de configuração
  ) {}

  async findPlaces(text: string) {
    try {
      const apiKey = this.configService.get<string>('GOOGLE_MAPS_API_KEY'); // Busca a chave da variável de ambiente

      const { data } = await this.googleMapsClient.findPlaceFromText({
        params: {
          input: text,
          inputtype: PlaceInputType.textQuery,
          fields: ['place_id', 'formatted_address', 'geometry', 'name'],
          key: apiKey, // Usa a chave da API
        },
      });

      return data;
    } catch (error) {
      throw new Error(`Erro ao buscar lugares: ${error.message}`);
    }
  }
}
