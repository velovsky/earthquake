import { Alert } from '@app/api/models/alert.enum';

export class EarthquakeCard {
  place: string;
  date: Date;
  magnitude: number;
  alert: Alert;
  tsunami: boolean;
  link: string;
  longitude: number;
  latitude: number;
}
