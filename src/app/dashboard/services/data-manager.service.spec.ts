import { TestBed } from '@angular/core/testing';

import { DataManagerService } from './data-manager.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('DataManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports : [
      HttpClientTestingModule,
      MatSnackBarModule
    ]
  }));

  it('should be created', () => {
    const service: DataManagerService = TestBed.get(DataManagerService);
    expect(service).toBeTruthy();
  });
});
