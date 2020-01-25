import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Earthquakes } from '../models/earthquakes';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EarthquakesService {

  protected basePath = environment.earthquakesApiEndpoint;

  constructor(private http: HttpClient) { }

  public getEarthquakes(): Observable<Earthquakes> {
    return this.http.get<Earthquakes>(`${this.basePath}`);
  }
}
