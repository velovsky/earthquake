import { Metadata } from './metadata';
import { Bbox } from './bbox';
import { Feature } from './feature';

export interface Earthquakes {
  type?: 'FeatureCollection';
  metadata?: Metadata;
  bbox?: Bbox;
  features: Feature[];
}
