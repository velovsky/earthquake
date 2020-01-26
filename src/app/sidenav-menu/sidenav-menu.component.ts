import { Component } from '@angular/core';
import { Sort } from '@app/models/sort';
import { EarthquakesService } from '@app/api/api/earthquakes.service';
import { EarthquakeCard } from '@app/models/earthquakeCard';
import { ApplySortFiltersService } from '@app/services/apply-sort-filters.service';

@Component({
  selector: 'app-sidenav-menu',
  templateUrl: './sidenav-menu.component.html',
  styleUrls: ['./sidenav-menu.component.scss']
})
export class SidenavMenuComponent {

  earthquakeCards: EarthquakeCard[] = [];

  sortFields: Sort[] = [
    {label: 'magnitude asc', value: Sort.SortEnum.MAG_ASC},
    {label: 'magnitude desc', value: Sort.SortEnum.MAG_DESC},
    {label: 'date/time asc', value: Sort.SortEnum.DATE_ASC},
    {label: 'date/time desc', value: Sort.SortEnum.DATE_DESC}
  ];

  sortBy: Sort.SortEnum = Sort.SortEnum.DATE_DESC;

  constructor(
    private earthquakesService: EarthquakesService,
    private dataManager: ApplySortFiltersService,
    ) {}

  public apply(): void {
    this.earthquakesService.getEarthquakes(this.sortBy)
    .subscribe(
      earthquakes => this.dataManager.updateData(earthquakes)
     );
  }
}
