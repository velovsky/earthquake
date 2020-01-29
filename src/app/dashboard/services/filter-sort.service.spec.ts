import { TestBed } from '@angular/core/testing';

import { FilterSortService } from './filter-sort.service';

describe('FilterSortService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FilterSortService = TestBed.get(FilterSortService);
    expect(service).toBeTruthy();
  });
});
