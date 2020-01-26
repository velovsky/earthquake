import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Earthquakes } from '../models/earthquakes';
import { environment } from 'src/environments/environment';
import { Sort } from '@app/models/sort';
import { Feature } from '../models/feature';

@Injectable({
  providedIn: 'root'
})
export class EarthquakesService {

  protected basePath = environment.earthquakesApiEndpoint;

  constructor(private http: HttpClient) { }

  public getEarthquakes(sort?: Sort.SortEnum): Observable<Earthquakes> {
    let output: Observable<Earthquakes> = this.http.get<Earthquakes>(`${this.basePath}`);

    if (sort) {
      output = output.pipe(
        tap(earthquakes => this.sortOperation(earthquakes, sort))
      );
    }

    return output;
  }

  // Sort functions
  private sortOperation(earthquakes: Earthquakes, sort: Sort.SortEnum): Earthquakes {
    const features: Feature[] = earthquakes.features;

    switch (sort) {
      case Sort.SortEnum.DATE_ASC:
        features.sort((a, b) => {
          const aTime = a.properties.time;
          const bTime = b.properties.time;
          return this.ASC(aTime, bTime);
        });
        break;
      case Sort.SortEnum.DATE_DESC:
        features.sort((a, b) => {
          const aTime = a.properties.time;
          const bTime = b.properties.time;
          return this.DESC(aTime, bTime);
        });
        break;
      case Sort.SortEnum.MAG_ASC:
        features.sort((a, b) => {
          const aMag = a.properties.mag;
          const bMag = b.properties.mag;
          return this.ASC(aMag, bMag);
        });
        break;
      case Sort.SortEnum.MAG_DESC:
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
