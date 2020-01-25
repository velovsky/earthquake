import { Properties } from './property';
import { Geometries as Geometry } from './geometry';

export interface Feature {
  type: 'Feature';
  properties: Properties;
  geometry: Geometry;
  id: string;
}
