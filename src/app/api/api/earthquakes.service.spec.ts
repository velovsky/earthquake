import { TestBed } from '@angular/core/testing';

import { EarthquakesService } from './earthquakes.service';

describe('EarthquakesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EarthquakesService = TestBed.get(EarthquakesService);
    expect(service).toBeTruthy();
  });
});
