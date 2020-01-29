import { TestBed } from '@angular/core/testing';

import { MapperEarthquakeToCardService } from './mapper-earthquake-to-card.service';

describe('MapperEarthquakeToCardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MapperEarthquakeToCardService = TestBed.get(MapperEarthquakeToCardService);
    expect(service).toBeTruthy();
  });
});
