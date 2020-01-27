import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Earthquakes } from '../models/earthquakes';
import { environment } from 'src/environments/environment';
import { Feature } from '../models/feature';
import { Sort } from '@app/models/sort.enum';
import { Properties } from '../models/property';
import { DateTime } from '@app/models/dateTime.enum';
import { Magnitude } from '@app/models/magnitude.enum';

@Injectable({
  providedIn: 'root'
})
export class EarthquakesService {

  protected basePath = `${environment.earthquakesApiEndpoint}`;
  private format = '.geojson';

  constructor(private http: HttpClient) { }

  public getEarthquakes(magnitude: Magnitude, date: DateTime, sort?: Sort): Observable<Earthquakes> {
    let output: Observable<Earthquakes> =
      this.http.get<Earthquakes>(`${this.basePath}/${magnitude}_${date}${this.format}`);

    // filters
    // if (alert) {
    //   output = output.pipe(
    //     tap(earthquakes => this.FilterAlert(earthquakes, alert))
    //   );
    // }

    // sort
    if (sort) {
      output = output.pipe(
        tap(earthquakes => this.sortOperation(earthquakes, sort))
      );
    }

    return output;
  }

  /** Filters */

  // Alert
  private FilterAlert(earthquakes: Earthquakes, alert: Properties.AlertEnum): Earthquakes {
    const features: Feature[] = earthquakes.features;
    earthquakes.features = features.filter( feature => feature.properties.alert === alert );

    return earthquakes;
  }

  /** Sort */

  private sortOperation(earthquakes: Earthquakes, sort: Sort): Earthquakes {
    const features: Feature[] = earthquakes.features;

    switch (sort) {
      case Sort.DATE_ASC:
        features.sort((a, b) => {
          const aTime = a.properties.time;
          const bTime = b.properties.time;
          return this.ASC(aTime, bTime);
        });
        break;
      case Sort.DATE_DESC:
        features.sort((a, b) => {
          const aTime = a.properties.time;
          const bTime = b.properties.time;
          return this.DESC(aTime, bTime);
        });
        break;
      case Sort.MAG_ASC:
        features.sort((a, b) => {
          const aMag = a.properties.mag;
          const bMag = b.properties.mag;
          return this.ASC(aMag, bMag);
        });
        break;
      case Sort.MAG_DESC:
        features.sort((a, b) => {
          const aMag = a.properties.mag;
          const bMag = b.properties.mag;
          return this.DESC(aMag, bMag);
        });
        break;
    }

    return earthquakes;
  }

  private DESC(a: number, b: number): number {
    return b - a;
  }

  private ASC(a: number, b: number): number {
    return -this.DESC(a, b);
  }
}
