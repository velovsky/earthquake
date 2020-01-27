import { DateTime } from './dateTime.enum';
import { Sort } from './sort.enum';
import { Magnitude } from './magnitude.enum';
import { Properties } from '@app/api/models/property';

export interface InitState {
  dateTime: DateTime;
  magnitude: Magnitude;
  alert: Properties.AlertEnum | 'all';
  sort: Sort;
}
