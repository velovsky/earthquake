import { Component, OnInit } from '@angular/core';
import { EarthquakesService } from './api/api/earthquakes.service';
import { EarthquakeCard } from './models/earthquakeCard';
import { MapperEarthquakeToCardService } from './services/mapper-earthquake-to-card.service';
import { Earthquakes } from './api/models/earthquakes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  earthquakeCards: EarthquakeCard[] = [];

  constructor(
    private earthquakesService: EarthquakesService,
    private mapperEarthquakeToCardService: MapperEarthquakeToCardService
    ) {}

  ngOnInit() {
    this.earthquakesService.getEarthquakes().subscribe(
      earthquakes => this.handleEarthquakes(earthquakes)
    );
  }

  handleEarthquakes(earthquakes: Earthquakes): void {
    this.earthquakeCards = earthquakes.features.map(
      feature => this.mapperEarthquakeToCardService.convert(feature)
    );

    console.log(this.earthquakeCards);
  }
}
