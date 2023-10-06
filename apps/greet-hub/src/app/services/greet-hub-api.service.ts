import { Injectable } from '@angular/core';
import { GreetHubEvent } from '../models/greet-hub-event';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GreetHubApiService {

  private _baseUrl = env.apiUrl + '/event';

  constructor(private readonly _http: HttpClient) { }

  public get(): Observable<GreetHubEvent[]> {
    return this._http.get<GreetHubEvent[]>(this._baseUrl).pipe(map(arrResp => arrResp.map(event => ({
      ...event,
      utcStartTime: new Date(event.utcStartTime),
      utcEndTime: new Date(event.utcEndTime)
    }))));
  }

  public add(event: GreetHubEvent): Observable<GreetHubEvent> {
    return this._http.post<GreetHubEvent>(this._baseUrl, event);
  }
}
