import { Component, Input } from '@angular/core';
import { EarthquakeCard } from './models/earthquakeCard';

@Component({
  selector: 'app-earthquake-card',
  templateUrl: './earthquake-card.component.html',
  styleUrls: ['./earthquake-card.component.scss']
})
export class EarthquakeCardComponent {

  // tslint:disable-next-line: no-input-rename
  @Input('info') earthquakesCard: EarthquakeCard;

}
