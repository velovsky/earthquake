import { TestBed } from '@angular/core/testing';

import { DataManagerService } from './data-manager.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DataManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports : [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: DataManagerService = TestBed.get(DataManagerService);
    expect(service).toBeTruthy();
  });
});
