import { Component, OnInit } from '@angular/core';
import { EarthquakesService } from './api/api/earthquakes.service';
import { EarthquakeCard } from './models/earthquakeCard';
import { MapperEarthquakeToCardService } from './services/mapper-earthquake-to-card.service';
import { Earthquakes } from './api/models/earthquakes';
import { first } from 'rxjs/operators';
import { Sort } from './models/sort';
import { ApplySortFiltersService } from './services/apply-sort-filters.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  earthquakeCards: EarthquakeCard[] = [];

  constructor(
    private earthquakesService: EarthquakesService,
    private mapperEarthquakeToCardService: MapperEarthquakeToCardService,
    private dataManager: ApplySortFiltersService
    ) {

      // init page with earthquakes
      this.earthquakesService
        .getEarthquakes(Sort.SortEnum.DATE_DESC)
        .pipe(first())
        .subscribe(
          earthquakes => this.handleEarthquakes(earthquakes)
        );

      // update results in page everytime the filter/sort is changed
      this.dataManager.newData$
        .subscribe(
          earthquakes => this.handleEarthquakes(earthquakes)
        );
  }

  ngOnInit() {
  }

  handleEarthquakes(earthquakes: Earthquakes): void {
    this.earthquakeCards = earthquakes.features.map(
      feature => this.mapperEarthquakeToCardService.convert(feature)
    );

    console.log(this.earthquakeCards);
  }
}
