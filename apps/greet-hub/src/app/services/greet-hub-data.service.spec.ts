import { TestBed } from '@angular/core/testing';

import { GreetHubDataService } from './greet-hub-data.service';
import { GreetHubApiService } from './greet-hub-api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { GreetHubEvent } from '../models/greet-hub-event';

describe('GreetHubDataService', () => {
  let service: GreetHubDataService;
  let apiService: GreetHubApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GreetHubApiService, GreetHubDataService]
    });
    service = TestBed.inject(GreetHubDataService);
    apiService = TestBed.inject(GreetHubApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add event', () => {
    const event: GreetHubEvent = {
      title: 'Test Event Title',
      description: 'Test Event ',
      location: 'Test Event Location',
      localTimeZoneId: 'Test Event TZ',
      utcStartTime: new Date(),
      utcEndTime: new Date(),
      id: 'Test Event Id'
    };
    jest.spyOn(apiService, 'add').mockReturnValue(of(event));

    service.add(event);

    expect(apiService.add).toHaveBeenCalledWith(event);
    expect(apiService.add).toHaveBeenCalledTimes(1);
  });
});
