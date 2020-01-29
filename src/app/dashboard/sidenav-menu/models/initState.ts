import { Alert } from '@app/api/models/alert.enum';
import { DateTime } from '@app/api/models/dateTime.enum';
import { Magnitude } from '@app/api/models/magnitude.enum';
import { Sort } from '@app/dashboard/models/sort.enum';

export interface InitState {
  dateTime: DateTime;
  magnitude: Magnitude;
  alert: Alert | 'all';
  sort: Sort;
}
