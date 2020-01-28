import { Component, OnInit, ViewChild } from '@angular/core';
import { EarthquakeCard } from './models/earthquakeCard';
import { MapperEarthquakeToCardService } from './services/mapper-earthquake-to-card.service';
import { Earthquakes } from './api/models/earthquakes';
import { DataManagerService } from './services/data-manager.service';
import { PageEvent } from '@angular/material/paginator';
import { MatSidenavContent } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  earthquakeCards: EarthquakeCard[] = [];
  earthquakeCardsPerPage: EarthquakeCard[] = []; // view variable

  // MatPaginator
  pageIndex = 0;
  pageSize = 5;
  pageEvent: PageEvent;

  // workaround to scroll to top
  @ViewChild('top', {static: false}) top !: MatSidenavContent;

  constructor(
    private mapperEarthquakeToCardService: MapperEarthquakeToCardService,
    private dataManager: DataManagerService
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
    this.pageIndex = 0; // reset to first page;
    this.earthquakeCards = earthquakes.features.map(
      feature => this.mapperEarthquakeToCardService.convert(feature)
    );

    // refresh the dashboard (limit to pageSize)
    this.earthquakeCardsPerPage = this.earthquakeCards.slice(0, this.pageSize);
    // scroll to top
    this.top.getElementRef().nativeElement.scrollTop = 0;
  }

  handleDataPerPage(event: PageEvent): PageEvent {
    this.pageIndex = event.pageIndex;
    this.earthquakeCardsPerPage = this.earthquakeCards.slice(this.pageIndex * this.pageSize,
       (this.pageIndex + 1) * this.pageSize);
    // scroll to top
    this.top.getElementRef().nativeElement.scrollTop = 0;

    return event;
  }
}
