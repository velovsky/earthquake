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
    const output: Observable<Earthquakes> = this.http.get<Earthquakes>(`${this.basePath}`);

    if (sort) {
      output.pipe(
        tap(earthquakes => this.sortOperation(earthquakes))
      );
    }

    return output;
  }

  private sortOperation(earthquakes: Earthquakes): Earthquakes {
    const features: Feature[] = earthquakes.features;

    features.sort((a, b) => {
      const aTime = a.properties.time;
      const bTime = b.properties.time;
      return aTime - bTime;
    });

    return earthquakes;
  }
}
