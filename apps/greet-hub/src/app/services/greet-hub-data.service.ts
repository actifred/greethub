import { Injectable } from '@angular/core';
import { GreetHubApiService } from './greet-hub-api.service';
import { BehaviorSubject } from 'rxjs';
import { GreetHubEvent } from '../models/greet-hub-event';

@Injectable({
  providedIn: 'root'
})
export class GreetHubDataService {

  private _events$ = new BehaviorSubject<GreetHubEvent[]>([]);
  public events$ = this._events$.asObservable();

  constructor(private readonly _apiService: GreetHubApiService) {
    this.refreshEvents();
  }

  add(event: GreetHubEvent) {
    this._apiService.add(event).subscribe(() => {
      this.refreshEvents();
    })
  }

  refreshEvents() {
    this._apiService.get().subscribe(events => {
      this._events$.next(events);
    })
  }
}
