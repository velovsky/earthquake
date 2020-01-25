import { TestBed } from '@angular/core/testing';

import { EarthquakesService } from './earthquakes.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EarthquakesService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports : [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: EarthquakesService = TestBed.get(EarthquakesService);
    expect(service).toBeTruthy();
  });
});
