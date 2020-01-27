import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DateTime } from '@app/models/dateTime.enum';
import { Magnitude } from '@app/models/magnitude.enum';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Earthquakes } from '../models/earthquakes';

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
