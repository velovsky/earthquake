import { Properties } from '@api/models/property';

export class EarthquakeCard {
  place: string;
  date: Date;
  magnitude: number;
  alert: Properties.AlertEnum;
  tsunami: boolean;
  link: string;
  longitude: number;
  latitude: number;
}
