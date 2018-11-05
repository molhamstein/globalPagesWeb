import { TestBed, inject } from '@angular/core/testing';

import { AdDataResolverService } from './ad-data-resolver.service';

describe('AdDataResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdDataResolverService]
    });
  });

  it('should be created', inject([AdDataResolverService], (service: AdDataResolverService) => {
    expect(service).toBeTruthy();
  }));
});
