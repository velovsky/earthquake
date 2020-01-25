import { Component, OnInit, Input } from '@angular/core';
import { EarthquakeCard } from '@app/models/earthquakeCard';

@Component({
  selector: 'app-earthquake-card',
  templateUrl: './earthquake-card.component.html',
  styleUrls: ['./earthquake-card.component.scss']
})
export class EarthquakeCardComponent implements OnInit {

  // tslint:disable-next-line: no-input-rename
  @Input('info') earthquakesCard: EarthquakeCard;

  constructor() { }

  ngOnInit() {
  }

}
