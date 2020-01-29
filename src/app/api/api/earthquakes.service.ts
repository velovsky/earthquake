import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Earthquakes } from '../models/earthquakes';
import { Magnitude } from '../models/magnitude.enum';
import { DateTime } from '../models/dateTime.enum';

@Injectable({
  providedIn: 'root'
})
export class EarthquakesService {

  protected basePath = `${environment.earthquakesApiEndpoint}`;
  private format = '.geojson';

  constructor(private http: HttpClient) { }

  public getEarthquakes(magnitude: Magnitude, date: DateTime): Observable<Earthquakes> {
    return this.http.get<Earthquakes>(`${this.basePath}/${magnitude}_${date}${this.format}`);
  }
}
