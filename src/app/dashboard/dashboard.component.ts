import { Component, OnDestroy, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSidenavContent } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import { EarthquakeCard } from './earthquake-card/models/earthquakeCard';
import { DataManagerService } from './services/data-manager.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnDestroy {

  earthquakeCards: EarthquakeCard[] = []; // view variable

  // MatPaginator
  pageIndex = 0;
  pageSize = 5;
  pageEvent: PageEvent;

  subscription: Subscription = new Subscription();

  // reference used to scroll to top on Material side container: https://github.com/angular/components/issues/4280
  @ViewChild('top', {static: false}) top !: MatSidenavContent;

  constructor(public dataManager: DataManagerService) {
      // update results in page everytime the filter/sort is changed
      this.subscription = this.dataManager.newData$.subscribe(
        () => {
          this.pageIndex = 0;
          this.handleEarthquakes();
        }
      );
  }

  // paginator event
  handleDataPerPage(event: PageEvent): PageEvent {
    this.pageIndex = event.pageIndex;
    this.handleEarthquakes();
    return event;
  }

  handleEarthquakes(): void {
    // refresh the dashboard (limit to pageSize)
    this.earthquakeCards = this.dataManager.getEarthquakeCards(this.pageIndex, this.pageSize);
    // scroll to top
    this.top.getElementRef().nativeElement.scrollTop = 0;
  }

  earthquakesExist(): boolean {
    return this.earthquakeCards.length !== 0;
  }

  ngOnDestroy() {
    // remove subs, to avoid memory leaks
    this.subscription.unsubscribe();
  }

}
