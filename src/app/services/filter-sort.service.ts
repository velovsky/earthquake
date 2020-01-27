import { Injectable } from '@angular/core';
import { Earthquakes } from '@app/api/models/earthquakes';
import { Sort } from '@app/models/sort.enum';
import { Feature } from '@app/api/models/feature';
import { Properties } from '@app/api/models/property';

@Injectable({
  providedIn: 'root'
})
export class FilterSortService {

  public fAlert(earthquakes: Earthquakes, alert: Properties.AlertEnum): Earthquakes {
    const features: Feature[] = earthquakes.features;
    earthquakes.features = features.filter( feature => feature.properties.alert === alert );

    return earthquakes;
  }

  public sort(earthquakes: Earthquakes, sort: Sort): Earthquakes {
    const features: Feature[] = earthquakes.features;

    switch (sort) {
      case Sort.DATE_ASC:
        features.sort((a, b) => {
          const aTime = a.properties.time;
          const bTime = b.properties.time;
          return this.ASC(aTime, bTime);
        });
        break;
      case Sort.DATE_DESC:
        features.sort((a, b) => {
          const aTime = a.properties.time;
          const bTime = b.properties.time;
          return this.DESC(aTime, bTime);
        });
        break;
      case Sort.MAG_ASC:
        features.sort((a, b) => {
          const aMag = a.properties.mag;
          const bMag = b.properties.mag;
          return this.ASC(aMag, bMag);
        });
        break;
      case Sort.MAG_DESC:
        features.sort((a, b) => {
          const aMag = a.properties.mag;
          const bMag = b.properties.mag;
          return this.DESC(aMag, bMag);
        });
        break;
    }

    return earthquakes;
  }

  private DESC(a: number, b: number): number {
    return b - a;
  }

  private ASC(a: number, b: number): number {
    return -this.DESC(a, b);
  }
}
