import { TestBed } from '@angular/core/testing';

import { FilterSortService } from './filter-sort.service';
import { Earthquakes } from '@app/api/models/earthquakes';
import { Alert } from '@app/api/models/alert.enum';
import { Sort } from '../models/sort.enum';
import { Feature } from '@app/api/models/feature';

describe('FilterSortService', () => {
  let service: FilterSortService;

  const dummyEarthquakes: Earthquakes = {
    features: [
    {
      properties: {
        mag: 6.3,
        place: '105km WNW of Kirakira, Solomon Islands',
        time: 1580101321450,
        url: 'https://earthquake.usgs.gov/earthquakes/eventpage/us60007gyx',
        alert: Alert.GREEN,
        tsunami: 1
      }
    },
    {
      properties: {
        mag: 8.5,
        place: 'Azores',
        time: 1580101321500,
        url: 'https://earthquake.usgs.gov/earthquakes/eventpage/us60007gyx',
        alert: Alert.GREEN,
        tsunami: 1
      }
    },
    {
      properties: {
        mag: 2.2,
        place: '122km Puerto Rico',
        time: 1580101321061,
        url: 'https://earthquake.usgs.gov/earthquakes/eventpage/us602347gyx',
        alert: Alert.RED,
        tsunami: 0
      }
    }]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});

    service = TestBed.get(FilterSortService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('ascendant date/time sort', () => {
    const youngest: Feature = dummyEarthquakes.features[2];

    const sortedEarthquakes: Earthquakes = service.sort({...dummyEarthquakes}, Sort.DATE_ASC);

    expect(sortedEarthquakes.features[0]).toEqual(youngest);
  });

  it('fitler for green alerts', () => {
    const filteredEarthquakes: Earthquakes = service.fAlert({...dummyEarthquakes}, Alert.GREEN);

    expect(filteredEarthquakes.features.length).toEqual(2);
  });
});
