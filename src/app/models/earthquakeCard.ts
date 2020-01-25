import { Properties } from '@api/models/property';

export interface EarthquakeCard {
  place: string;
  date: Date;
  magnitude: number;
  alert: Properties.AlertEnum;
  tsunami: boolean;
  link: string;
  coordinates: number[];
}
