import { TestBed } from '@angular/core/testing';

import { GreetHubDataService } from './greet-hub-data.service';

describe('GreetHubDataService', () => {
  let service: GreetHubDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GreetHubDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
