import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Earthquakes } from '@app/api/models/earthquakes';
import { EarthquakesService } from '@app/api/api/earthquakes.service';
import { FilterSortService } from './filter-sort.service';
import { first } from 'rxjs/operators';
import { Magnitude } from '@app/models/magnitude.enum';
import { DateTime } from '@app/models/dateTime.enum';
import { Sort } from '@app/models/sort.enum';
import { Properties } from '@app/api/models/property';
import { InitState } from '@app/models/initState';

@Injectable({
  providedIn: 'root'
})
// service responsible to communicate data to dashboard (+- redux)
export class DataManagerService {

  // in-memory data
  earthquakes: Earthquakes;

  // Observable string sources
  private newData = new Subject<Earthquakes>();

  // Observable string streams
  newData$ = this.newData.asObservable();

  // old values / init state
  private oldDate: DateTime = DateTime.WEEK;
  private oldMag: Magnitude = Magnitude.SIGNIFICANT;

  constructor(
    private earthquakesService: EarthquakesService,
    private filterSort: FilterSortService
    ) {

      // initial data when loading page
      this.earthquakesService
        .getEarthquakes(this.oldMag, this.oldDate)
        .pipe(first())
        .subscribe(earthquakes => {
          this.earthquakes = earthquakes; // persist data in memory (this.earthquakes)
          this.modifyData(earthquakes, Sort.DATE_DESC, 'all');
        });
    }

  // Service message commands
  updateData(earthquakes: Earthquakes): void {
    this.newData.next(earthquakes);
  }

  // return initial state
  initState(): InitState {
    return {
      dateTime: this.oldDate,
      magnitude: this.oldMag,
      alert: 'all',
      sort: Sort.DATE_DESC
    };
  }

  receiveDataFromMenu(selectDate: DateTime, selectedMagnitude: Magnitude, sortBy: Sort, selectedAlert: Properties.AlertEnum | 'all'): void {
    // API calls algorithm
    // if one of these two values change, then it is required to fetch new data from the server
    if (selectDate !== this.oldDate || selectedMagnitude !== this.oldMag) {
      // update old data
      this.oldDate = selectDate;
      this.oldMag = selectedMagnitude;

      this.earthquakesService.getEarthquakes(selectedMagnitude, selectDate)
          .subscribe(earthquakes => {
              this.earthquakes = earthquakes; // persist data in memory (this.earthquakes)
              this.modifyData(earthquakes, sortBy, selectedAlert);
          });
    } else { // use earthquakes in memory
      this.modifyData(this.earthquakes, sortBy, selectedAlert);
    }
  }

  // filter/sort and update the data in the dashboard
  private modifyData(earthquakes: Earthquakes, sortBy: Sort, filterAlert: Properties.AlertEnum | 'all'): void {
    let output: Earthquakes = {...earthquakes}; // clone

    // filter by alert
    if (filterAlert !== 'all') {
      output = this.filterSort.fAlert(output, filterAlert);
    }
    // sort
    output = this.filterSort.sort(output, sortBy);
    // trigger
    this.updateData(output);
  }
}
