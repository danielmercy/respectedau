import { TestBed, inject } from '@angular/core/testing';

import { CountryApiService } from './country-api.service';

describe('CountryApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CountryApiService]
    });
  });

  it('should be created', inject([CountryApiService], (service: CountryApiService) => {
    expect(service).toBeTruthy();
  }));
});
