import { Component } from '@angular/core';
import { Sort } from '@app/models/sort';
import { EarthquakesService } from '@app/api/api/earthquakes.service';
import { MapperEarthquakeToCardService } from '@app/services/mapper-earthquake-to-card.service';
import { EarthquakeCard } from '@app/models/earthquakeCard';
import { Earthquakes } from '@app/api/models/earthquakes';

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
    private mapperEarthquakeToCardService: MapperEarthquakeToCardService // TEMP
    ) {}

  public apply(): void {
    this.earthquakesService.getEarthquakes(this.sortBy)
    .subscribe(
      earthquakes => this.handleEarthquakes(earthquakes)
     );
  }

  // TEMP
  handleEarthquakes(earthquakes: Earthquakes): void {
    this.earthquakeCards = earthquakes.features.map(
      feature => this.mapperEarthquakeToCardService.convert(feature)
    );
    console.log(this.earthquakeCards);
  }

}
