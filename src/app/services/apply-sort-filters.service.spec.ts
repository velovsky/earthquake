import { TestBed } from '@angular/core/testing';

import { ApplySortFiltersService } from './apply-sort-filters.service';

describe('ApplySortFiltersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApplySortFiltersService = TestBed.get(ApplySortFiltersService);
    expect(service).toBeTruthy();
  });
});
