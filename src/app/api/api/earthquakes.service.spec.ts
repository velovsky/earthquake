import { TestBed } from '@angular/core/testing';

import { EarthquakesService } from './earthquakes.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('EarthquakesService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports : [
      HttpClientTestingModule,
      MatSnackBarModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  }));

  it('should be created', () => {
    const service: EarthquakesService = TestBed.get(EarthquakesService);
    expect(service).toBeTruthy();
  });
});
