import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  public isLoading = new BehaviorSubject<boolean>(false);

  setLoading(input: boolean) {
    this.isLoading.next(input);
  }

}
