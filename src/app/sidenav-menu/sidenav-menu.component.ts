import { Component } from '@angular/core';
import { Sort } from '@app/models/sort';
import { EarthquakesService } from '@app/api/api/earthquakes.service';

@Component({
  selector: 'app-sidenav-menu',
  templateUrl: './sidenav-menu.component.html',
  styleUrls: ['./sidenav-menu.component.scss']
})
export class SidenavMenuComponent {

  sortFields: Sort[] = [
    {label: 'magnitude asc', value: Sort.SortEnum.MAG_ASC},
    {label: 'magnitude desc', value: Sort.SortEnum.MAG_DESC},
    {label: 'date/time asc', value: Sort.SortEnum.DATE_ASC},
    {label: 'date/time desc', value: Sort.SortEnum.DATE_DESC}
  ];

  sortBy: Sort;

  constructor(private earthquakesService: EarthquakesService) {};

  public apply(): void {
    this.earthquakesService.getEarthquakes(this.sortBy.value);
  }

}
