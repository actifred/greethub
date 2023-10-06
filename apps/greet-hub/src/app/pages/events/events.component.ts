import { Component, OnDestroy, OnInit } from '@angular/core';
import { GreetHubDataService } from '../../services/greet-hub-data.service';
import { TableGreetHubEvent } from '../../models/greet-hub-event';
import { Subject, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { EventFormContainerComponent } from '../event-form-container/event-form-container.component';

@Component({
  selector: 'greet-hub-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit, OnDestroy {

  public events: TableGreetHubEvent[] = [];
  public displayedColumns: string[] = ['title', 'location', 'startTime', 'endTime'];

  private _unsubscribe$ = new Subject<void>();

  constructor(private _dataService: GreetHubDataService, private _dialog: MatDialog) {}

  ngOnInit() {
    this._dataService.events$.pipe(takeUntil(this._unsubscribe$)).subscribe(events => {
      this.events = events.sort((a, b) => {
        return new Date(b.utcStartTime).getTime() - new Date(a.utcStartTime).getTime();
      }).map(event => {
        return {
          id: event.id || '',
          title: event.title,
          location: event.location,
          startTime: event.utcStartTime.toLocaleString('fr-FR', { timeZone: event.localTimeZoneId}),
          endTime: event.utcEndTime.toLocaleString('fr-FR', { timeZone: event.localTimeZoneId}),
        };
      });
    });
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  openAddForm() {
    this._dialog.open(EventFormContainerComponent);
  }
}
