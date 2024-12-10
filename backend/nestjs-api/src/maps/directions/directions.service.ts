import { Injectable } from '@nestjs/common';
import { DirectionsRequest, Client as GoogleMapsClient, TravelMode } from '@googlemaps/google-maps-services-js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DirectionsService {
  constructor(
    private readonly googleMapsClient: GoogleMapsClient, // Injeção do cliente Google Maps
    private readonly configService: ConfigService, // Injeção do serviço de configuração
  ) {}

  async getDirection(originId: string, destinationId: string) {
    try {
      // Parâmetros da requisição para a API Google Directions
      const requestParams: DirectionsRequest['params'] = {
        origin: `place_id:${originId}`,
        destination: `place_id:${destinationId}`,
        mode: TravelMode.driving,
        key: this.configService.get<string>('GOOGLE_MAPS_API_KEY'), // Chave da API do .env
      };

      // Faz a requisição para a API Google Directions
      const { data } = await this.googleMapsClient.directions({
        params: requestParams,
      });

      if (!data.routes || data.routes.length === 0) {
        throw new Error('Nenhuma rota encontrada.');
      }

      // Construindo uma resposta personalizada
      const route = data.routes[0]; // Considerando a primeira rota como principal
      const leg = route.legs[0]; // Considerando o primeiro trecho da rota

      return {
        ...data,
        request: {
          origin: {
            place_id: requestParams.origin,
            location: {
              lat: leg.start_location.lat,
              lng: leg.start_location.lng,
            },
          },
          destination: {
            place_id: requestParams.destination,
            location: {
              lat: leg.end_location.lat,
              lng: leg.end_location.lng,
            },
          },
          mode: requestParams.mode,
        },
      };
    } catch (error) {
      throw new Error(`Erro ao buscar direções: ${error.message}`);
    }
  }
}
