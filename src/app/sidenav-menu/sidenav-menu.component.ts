import { Component, OnInit } from '@angular/core';
import { Earthquakes } from '@app/api/models/earthquakes';
import { Properties } from '@app/api/models/property';
import { DateTime } from '@app/models/dateTime.enum';
import { FilterSelect } from '@app/models/filterSelect';
import { Magnitude } from '@app/models/magnitude.enum';
import { Sort } from '@app/models/sort.enum';
import { SortSelect } from '@app/models/sortSelect';
import { DataManagerService } from '@app/services/data-manager.service';

@Component({
  selector: 'app-sidenav-menu',
  templateUrl: './sidenav-menu.component.html',
  styleUrls: ['./sidenav-menu.component.scss']
})
export class SidenavMenuComponent implements OnInit {

  earthquakes: Earthquakes;

  // date
  dateFields: FilterSelect[] = [];
  private dateOptions: string[] = Object.keys(DateTime).map(key => DateTime[key]);


  // magnitude
  magnitudeFields: FilterSelect[] = [
    {label: 'All', value: Magnitude.ALL},
    {label: 'Significant', value: Magnitude.SIGNIFICANT},
    {label: '> 4.5', value: Magnitude.FOUR_FIVE},
    {label: '> 2.5', value: Magnitude.TWO_FIVE},
    {label: '> 1.0', value: Magnitude.ONE_ZERO}
  ];

  // alert
  alertFields: FilterSelect[] = [];
  private alertOptions: string[] = Object.keys(Properties.AlertEnum).map(key => Properties.AlertEnum[key]);

  // sort
  sortFields: SortSelect[] = [
    {label: 'magnitude asc', value: Sort.MAG_ASC},
    {label: 'magnitude desc', value: Sort.MAG_DESC},
    {label: 'date/time asc', value: Sort.DATE_ASC},
    {label: 'date/time desc', value: Sort.DATE_DESC}
  ];

  // select values
  sortBy: Sort;
  selectedAlert: Properties.AlertEnum | 'all';
  selectedMagnitude: Magnitude;
  selectedDate: DateTime;

  constructor(private dataManager: DataManagerService) {
    const {dateTime, magnitude, alert, sort} = this.dataManager.initState();
    this.selectedDate = dateTime;
    this.selectedMagnitude = magnitude;
    this.selectedAlert = alert;
    this.sortBy = sort;
  }

  ngOnInit() {
    // populate dateFields
    this.dateFields = this.dateOptions.map( date => {
      return {label: date, value: date};
    });

    // populate alertFields
    this.alertFields = this.alertOptions.map(alert => {
      return {label: alert, value: alert};
    });
  }

  public apply(): void {
    this.dataManager.receiveDataFromMenu(this.selectedDate, this.selectedMagnitude,
       this.sortBy, this.selectedAlert);
  }
}
