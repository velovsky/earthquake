import { Component, OnInit } from '@angular/core';
import { EarthquakesService } from './api/api/earthquakes.service';
import { Feature } from './api/models/feature';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  numberOfEarthquakes: number;
  earthquakes: Feature[];

  constructor(private earthquakesService: EarthquakesService) {}

  ngOnInit() {
    this.earthquakesService.getEarthquakes().subscribe(
      earthquakes => {
        this.numberOfEarthquakes = earthquakes.metadata.count;
        this.earthquakes = earthquakes.features;
      }
    );
  }
}
