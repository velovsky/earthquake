import { Component, OnInit } from '@angular/core';
import { EarthquakesService } from './api/api/earthquakes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'earthquake';

  constructor(private earthquakesService: EarthquakesService) {}

  ngOnInit() {
    this.earthquakesService.getEarthquakes().subscribe(
      earthquakes => console.log(earthquakes)
    );
  }
}
