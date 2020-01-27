import { Component, OnInit } from '@angular/core';
import { EarthquakeCard } from './models/earthquakeCard';
import { MapperEarthquakeToCardService } from './services/mapper-earthquake-to-card.service';
import { Earthquakes } from './api/models/earthquakes';
import { ApplySortFiltersService } from './services/apply-sort-filters.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  earthquakeCards: EarthquakeCard[] = [];

  constructor(
    private mapperEarthquakeToCardService: MapperEarthquakeToCardService,
    private dataManager: ApplySortFiltersService
    ) {

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
