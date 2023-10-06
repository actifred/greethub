import { TestBed } from '@angular/core/testing';

import { GreetHubApiService } from './greet-hub-api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GreetHubEvent } from '../models/greet-hub-event';

describe('GreetHubApiService', () => {
  let service: GreetHubApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GreetHubApiService]
    });
    service = TestBed.inject(GreetHubApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add event', () => {
    const sentEvent: GreetHubEvent = {
      title: 'Test Event Title',
      description: 'Test Event Description',
      location: 'Test Event Location',
      localTimeZoneId: 'Test Event TZ',
      utcStartTime: new Date(),
      utcEndTime: new Date(),
    }

    const expectedRes = {
      ...sentEvent,
      id: 'Test Event Id'
    }

    service.add(sentEvent).subscribe((res) => {
      expect(res).toMatchObject(expectedRes);
    });

    const req = httpMock.expectOne((service as any)._baseUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(sentEvent);
    req.flush(expectedRes);
  });

});
