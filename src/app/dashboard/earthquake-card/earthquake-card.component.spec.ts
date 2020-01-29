import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EarthquakeCardComponent } from './earthquake-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { EarthquakeCard } from './models/earthquakeCard';


describe('EarthquakeCardComponent', () => {
  let component: EarthquakeCardComponent;
  let fixture: ComponentFixture<EarthquakeCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EarthquakeCardComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        MatCardModule,
        MatButtonModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EarthquakeCardComponent);
    component = fixture.componentInstance;
    const earthquakeCard = new EarthquakeCard();
    component.earthquakesCard = earthquakeCard;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
