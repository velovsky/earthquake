import { Injectable } from '@angular/core';
import { EarthquakeCard } from '@app/models/earthquakeCard';
import { Feature } from '@app/api/models/feature';

@Injectable({
  providedIn: 'root'
})
export class MapperEarthquakeToCardService {

  convert(input: Feature): EarthquakeCard {

    const { properties, geometry } = input;

    // properties variables
    const {place, mag, alert, time, tsunami, url } = properties;

    // geometry variabels
    const { coordinates } = geometry;

    const output: EarthquakeCard = {
      place,
      magnitude: mag,
      alert,
      link: url,
      date: new Date(time),
      tsunami: tsunami === 1 ? true : false,
      coordinates
    };

    return output;
  }
}
