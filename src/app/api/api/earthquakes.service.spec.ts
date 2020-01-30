import { TestBed } from '@angular/core/testing';

import { EarthquakesService } from './earthquakes.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Earthquakes } from '../models/earthquakes';
import { Alert } from '../models/alert.enum';
import { DateTime } from '../models/dateTime.enum';
import { Magnitude } from '../models/magnitude.enum';
import { environment } from 'src/environments/environment';

describe('EarthquakesService', () => {
  let service: EarthquakesService;
  let httpMock: HttpTestingController;

  const dummyEarthquakes: Earthquakes = {
    features: [
    {
      properties: {
        mag: 6.3,
        place: '105km WNW of Kirakira, Solomon Islands',
        time: 1580101321061,
        url: 'https://earthquake.usgs.gov/earthquakes/eventpage/us60007gyx',
        alert: Alert.GREEN,
        tsunami: 0
      }
    },
    {
      properties: {
        mag: 2.2,
        place: '122km Puerto Rico',
        time: 1580101321061,
        url: 'https://earthquake.usgs.gov/earthquakes/eventpage/us602347gyx',
        alert: Alert.RED,
        tsunami: 1
      }
    }]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports : [
      HttpClientTestingModule,
      MatSnackBarModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });

    service = TestBed.get(EarthquakesService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get earthquakes', () => {
    const magnitude: Magnitude = Magnitude.SIGNIFICANT;
    const datetime: DateTime = DateTime.MONTH;
    service.getEarthquakes(magnitude, datetime).subscribe(
      earthquakes => {
        expect(earthquakes.features.length).toBe(dummyEarthquakes.features.length);
        expect(earthquakes).toEqual(dummyEarthquakes);
    });

    const req = httpMock.expectOne(`${environment.earthquakesApiEndpoint}/${magnitude}_${datetime}${service.format}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyEarthquakes);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
