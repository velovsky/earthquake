import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DateTime } from '../models/dateTime.enum';
import { Earthquakes } from '../models/earthquakes';
import { Magnitude } from '../models/magnitude.enum';

@Injectable({
  providedIn: 'root'
})
export class EarthquakesService {

  protected basePath = `${environment.earthquakesApiEndpoint}`;
  public format = '.geojson';

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  public getEarthquakes(magnitude: Magnitude, date: DateTime): Observable<Earthquakes> {
    return this.http.get<Earthquakes>(`${this.basePath}/${magnitude}_${date}${this.format}`)
      .pipe(
        retry(3),
        catchError(this.triggerHttpError.bind(this))
      );
  }

  private triggerHttpError(): Observable<Earthquakes> {
    this.snackBar.open('Unable to load data, please try again later', 'close');
    return throwError('Http Error');
  }
}
