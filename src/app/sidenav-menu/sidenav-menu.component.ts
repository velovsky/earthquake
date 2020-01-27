import { Component, OnInit } from '@angular/core';
import { EarthquakesService } from '@app/api/api/earthquakes.service';
import { Earthquakes } from '@app/api/models/earthquakes';
import { Properties } from '@app/api/models/property';
import { DateTime } from '@app/models/dateTime.enum';
import { FilterSelect } from '@app/models/filterSelect';
import { Magnitude } from '@app/models/magnitude.enum';
import { Sort } from '@app/models/sort.enum';
import { SortSelect } from '@app/models/sortSelect';
import { DataManagerService } from '@app/services/data-manager.service';
import { FilterSortService } from '@app/services/filter-sort.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-sidenav-menu',
  templateUrl: './sidenav-menu.component.html',
  styleUrls: ['./sidenav-menu.component.scss']
})
export class SidenavMenuComponent implements OnInit {

  earthquakes: Earthquakes;

  // date
  dateFields: FilterSelect[] = [
    {label: DateTime.HOUR, value: DateTime.HOUR},
    {label: DateTime.DAY, value: DateTime.DAY},
    {label: DateTime.WEEK, value: DateTime.WEEK},
    {label: DateTime.MONTH, value: DateTime.MONTH}

  ];

  // magnitude
  magnitudeFields: FilterSelect[] = [
    {label: 'All', value: Magnitude.ALL},
    {label: 'Significant', value: Magnitude.SIGNIFICANT},
    {label: '> 4.5', value: Magnitude.FOUR_FIVE},
    {label: '> 2.5', value: Magnitude.TWO_FIVE},
    {label: '> 1.0', value: Magnitude.ONE_ZERO}
  ];

  // alert
  alertFields: FilterSelect[] = [];
  private alertOptions: string[] = Object.keys(Properties.AlertEnum).map(key => Properties.AlertEnum[key]);

  // sort
  sortFields: SortSelect[] = [
    {label: 'magnitude asc', value: Sort.MAG_ASC},
    {label: 'magnitude desc', value: Sort.MAG_DESC},
    {label: 'date/time asc', value: Sort.DATE_ASC},
    {label: 'date/time desc', value: Sort.DATE_DESC}
  ];

  // select values
  sortBy: Sort = Sort.DATE_DESC;
  selectedAlert: Properties.AlertEnum | 'all' = 'all';
  selectedMagnitude: Magnitude = Magnitude.SIGNIFICANT;
  selectedDate: DateTime = DateTime.WEEK;

  // old values
  private oldDate: DateTime = DateTime.WEEK;
  private oldMag: Magnitude = Magnitude.SIGNIFICANT;

  constructor(
    private earthquakesService: EarthquakesService,
    private dataManager: DataManagerService,
    private filterSort: FilterSortService
    ) {

      // initial data when loading page
      this.earthquakesService
        .getEarthquakes(this.selectedMagnitude, this.selectedDate)
        .pipe(first())
        .subscribe(earthquakes => {
          this.earthquakes = earthquakes; // persist data in memory (this.earthquakes)
          this.modifyData(earthquakes, this.sortBy, this.selectedAlert);
        });
    }

  ngOnInit() {
    // populate alertFields
    this.alertFields = this.alertOptions.map(alert => {
      return {label: alert, value: alert};
    });
  }

  public apply(): void {

    // API calls algorithm
    // if one of these two values change, then it is required to fetch new data from the server
    if (this.selectedDate !== this.oldDate || this.selectedMagnitude !== this.oldMag) {
      // update old data
      this.oldDate = this.selectedDate;
      this.oldMag = this.selectedMagnitude;

      this.earthquakesService.getEarthquakes(this.selectedMagnitude, this.selectedDate)
          .subscribe(earthquakes => {
              this.earthquakes = earthquakes; // persist data in memory (this.earthquakes)
              this.modifyData(earthquakes, this.sortBy, this.selectedAlert);
          });
    } else { // use earthquakes in memory
      this.modifyData(this.earthquakes, this.sortBy, this.selectedAlert);
    }
  }

  // filter/sort and update the data in the dashboard
  private modifyData(earthquakes: Earthquakes, sortBy: Sort, filterAlert?: Properties.AlertEnum | 'all'): void {
    let output: Earthquakes = {...earthquakes}; // clone

    // filter by alert
    if (filterAlert && filterAlert !== 'all') {
      output = this.filterSort.fAlert(output, filterAlert);
    }
    // sort
    output = this.filterSort.sort(output, sortBy);
    // trigger
    this.dataManager.updateData(output);
  }
}
