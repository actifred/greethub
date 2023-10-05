import { TestBed } from '@angular/core/testing';

import { GreetHubApiService } from './greet-hub-api.service';

describe('GreetHubApiService', () => {
  let service: GreetHubApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GreetHubApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
