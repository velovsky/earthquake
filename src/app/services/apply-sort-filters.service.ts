import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Earthquakes } from '@app/api/models/earthquakes';

@Injectable({
  providedIn: 'root'
})
export class ApplySortFiltersService {

  // Observable string sources
  private newData = new Subject<Earthquakes>();

  // Observable string streams
  newData$ = this.newData.asObservable();

  // Service message commands
  updateData(earthquakes: Earthquakes) {
    this.newData.next(earthquakes);
  }
}
