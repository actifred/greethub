import { Injectable } from '@angular/core';
import { GreetHubEvent } from '../models/greet-hub-event';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GreetHubApiService {

  private _baseUrl = 'https://localhost:5001/event';

  constructor(private readonly _http: HttpClient) { }

  public get(): Observable<GreetHubEvent[]> {
    return this._http.get<GreetHubEvent[]>(this._baseUrl);
  }

  public add(event: GreetHubEvent): Observable<GreetHubEvent> {
    return this._http.post<GreetHubEvent>(this._baseUrl, event);
  }
}
