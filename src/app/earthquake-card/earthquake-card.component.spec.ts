import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EarthquakeCardComponent } from './earthquake-card.component';

describe('EarthquakeCardComponent', () => {
  let component: EarthquakeCardComponent;
  let fixture: ComponentFixture<EarthquakeCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EarthquakeCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EarthquakeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
