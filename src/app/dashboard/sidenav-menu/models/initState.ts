import { DateTime } from '@app/api/models/dateTime.enum';
import { Sort } from '@app/dashboard/models/sort.enum';
import { Magnitude } from '@app/api/models/magnitude.enum';
import { Properties } from '@app/api/models/property';

export interface InitState {
  dateTime: DateTime;
  magnitude: Magnitude;
  alert: Properties.AlertEnum | 'all';
  sort: Sort;
}
