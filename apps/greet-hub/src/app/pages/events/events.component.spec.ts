import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventsComponent } from './events.component';
import { TableGreetHubEvent } from '../../models/greet-hub-event';
import { GreetHubDataService } from '../../services/greet-hub-data.service';
import { of } from 'rxjs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('EventsComponent', () => {
  let component: EventsComponent;
  let fixture: ComponentFixture<EventsComponent>;

  // Mock the DataService
  const dataServiceMock = {
    events$: of([
      {
        title: 'Event 1',
        description: 'Description 1',
        location: 'Location 1',
        localTimeZoneId: 'Europe/Paris',
        utcStartTime: new Date('2021-01-01T18:00:00Z'),
        utcEndTime: new Date('2021-01-01T20:00:00Z'),
        id: '1',
      },
      {
        title: 'Event 2',
        description: 'Description 2',
        location: 'Location 2',
        localTimeZoneId: 'Europe/Paris',
        utcStartTime: new Date('2021-02-01T16:00:00Z'),
        utcEndTime: new Date('2021-02-01T17:00:00Z'),
        id: '2',
      },
    ]),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MatDialogModule,
        MatIconModule,
        MatTableModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatInputModule,
        MatButtonModule,
      ],
      declarations: [EventsComponent],
      providers: [{ provide: GreetHubDataService, useValue: dataServiceMock }],
    });
    fixture = TestBed.createComponent(EventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use local time and sort events in reverse chronological order', () => {
    const expectedTableEvent: TableGreetHubEvent[] = [
      {
        title: 'Event 2',
        location: 'Location 2',
        startTime: '01/02/2021 17:00:00',
        endTime: '01/02/2021 18:00:00',
        id: '2',
      },
      {
        title: 'Event 1',
        location: 'Location 1',
        startTime: '01/01/2021 19:00:00',
        endTime: '01/01/2021 21:00:00',
        id: '1',
      },
    ];

    expect(component.events.length).toBe(2);
    expect(component.events[0]).toEqual(expectedTableEvent[0]);
    expect(component.events[1]).toEqual(expectedTableEvent[1]);
  });

  it('should display table events', () => {
    const eventElements =
      fixture.nativeElement.querySelectorAll('.mat-mdc-row');
    expect(eventElements.length).toBe(component.events.length);
    expect(
      eventElements[0].querySelector('.cdk-column-title').textContent
    ).toContain(component.events[0].title);
    expect(
      eventElements[1].querySelector('.cdk-column-title').textContent
    ).toContain(component.events[1].title);
  });
});
