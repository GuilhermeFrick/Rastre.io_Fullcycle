import { Injectable } from '@nestjs/common';
import { Client as GoogleMapsClient, PlaceInputType } from '@googlemaps/google-maps-services-js';

@Injectable()
export class PlacesService {
  constructor(private readonly googleMapsClient: GoogleMapsClient) {}

  async findPlaces(text: string) {
    try {
      const { data } = await this.googleMapsClient.findPlaceFromText({
        params: {
          input: text,
          inputtype: PlaceInputType.textQuery,
          fields: ['place_id', 'formatted_address', 'geometry', 'name'],
          key: 'AIzaSyBlSym0EzM7QSalz5uYhbNRur6KbpiXNJY', // Chave segura via variável de ambiente
        },
      });

      return data;
    } catch (error) {
      throw new Error(`Erro ao buscar lugares: ${error.message}`);
    }
  }
}
