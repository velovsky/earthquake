import { Component, OnInit } from '@angular/core';
import { EarthquakesService } from '@app/api/api/earthquakes.service';
import { EarthquakeCard } from '@app/models/earthquakeCard';
import { ApplySortFiltersService } from '@app/services/apply-sort-filters.service';
import { Sort } from '@app/models/sort.enum';
import { SortSelect } from '@app/models/sortSelect';
import { Properties } from '@app/api/models/property';
import { first } from 'rxjs/operators';
import { Earthquakes } from '@app/api/models/earthquakes';
import { Feature } from '@app/api/models/feature';
import { FilterSelect } from '@app/models/filterSelect';
import { DateTime } from '@app/models/dateTime.enum';
import { Magnitude } from '@app/models/magnitude.enum';

@Component({
  selector: 'app-sidenav-menu',
  templateUrl: './sidenav-menu.component.html',
  styleUrls: ['./sidenav-menu.component.scss']
})
export class SidenavMenuComponent implements OnInit {

  earthquakeCards: EarthquakeCard[] = [];

  // date
  dateFields: FilterSelect[] = [
    {label: DateTime.HOUR, value: DateTime.HOUR},
    {label: DateTime.DAY, value: DateTime.DAY},
    {label: DateTime.WEEK, value: DateTime.WEEK},
    {label: DateTime.MONTH, value: DateTime.MONTH}

  ];

  // magnitude
  magnitudeFields: FilterSelect[] = [
    {label: 'Significant', value: Magnitude.SIGNIFICANT},
    {label: '> 4.5', value: Magnitude.FOUR_FIVE},
    {label: '> 2.5', value: Magnitude.TWO_FIVE},
    {label: '> 1.0', value: Magnitude.ONE_ZERO},
    {label: 'All', value: Magnitude.ALL}
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
  selectedAlert: Properties.AlertEnum;
  selectedMagnitude: Magnitude = Magnitude.SIGNIFICANT;
  selectedDate: DateTime = DateTime.WEEK;

  // old values
  private oldDate: DateTime = DateTime.WEEK;
  private oldMag: Magnitude = Magnitude.SIGNIFICANT;

  constructor(
    private earthquakesService: EarthquakesService,
    private dataManager: ApplySortFiltersService,
    ) {

      // initial data when loading page
      this.earthquakesService
        .getEarthquakes(this.selectedMagnitude, this.selectedDate, this.sortBy)
        .pipe(first())
        .subscribe(
          earthquakes => this.dataManager.updateData(earthquakes)
        );
    }

  ngOnInit() {
    // populate alertFields
    this.alertFields = this.alertOptions.map(alert => {
      return {label: alert, value: alert};
    });
  }

  public apply(): void {

    // only if these two values change, that it is required to fetch data from server
    if (this.selectedDate !== this.oldDate || this.selectedMagnitude !== this.oldMag) {
      // update old data
      this.oldDate = this.selectedDate;
      this.oldMag = this.selectedMagnitude;

      this.earthquakesService.getEarthquakes(this.selectedMagnitude, this.selectedDate)
          .subscribe(
            earthquakes => this.dataManager.updateData(earthquakes)
          );
    }

    // filter alert

    // sort
    
  }

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
