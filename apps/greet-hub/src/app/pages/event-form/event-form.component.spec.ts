import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { EventFormComponent } from './event-form.component';
import { FormGreetHubEvent } from '../../models/greet-hub-event';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DateTime } from 'ts-luxon';

describe('EventFormComponent', () => {
  let component: EventFormComponent;
  let fixture: ComponentFixture<EventFormComponent>;

  const formEvent: FormGreetHubEvent = {
    title: 'Test Event Title',
    description: 'Test Event Description',
    location: 'Test Event Location',
    localTimeZoneId: 'Europe/London',
    startDate: DateTime.fromISO('2021-08-01').toJSDate(),
    startHour: 0,
    startMinute: 0,
    endDate: DateTime.fromISO('2021-08-02').toJSDate(),
    endHour: 0,
    endMinute: 0,
  };

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [EventFormComponent],
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatInputModule,
        MatButtonModule,
      ],
    });
    await TestBed.compileComponents();
    fixture = TestBed.createComponent(EventFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit event on form submission', () => {
    const emitSpy = jest.spyOn(component.newEvent, 'emit');

    component.form.setValue(formEvent);
    component.onSubmit();

    const expectedEmittedEvent = {
      title: formEvent.title,
      description: formEvent.description,
      location: formEvent.location,
      localTimeZoneId: formEvent.localTimeZoneId,
      utcStartTime: formEvent.startDate,
      utcEndTime: formEvent.endDate,
    };

    expect(emitSpy).toHaveBeenCalledWith(expectedEmittedEvent);
  });

  it('should disable submit button when form is invalid', () => {
    component.form.controls['title'].setValue('');
    fixture.detectChanges();
    const submitButton = fixture.nativeElement.querySelector(
      'button[type="submit"]'
    );

    expect(submitButton.disabled).toBe(true);
  });

  it('should enable submit button when form is valid', () => {
    component.form.setValue(formEvent);
    fixture.detectChanges();
    const submitButton = fixture.nativeElement.querySelector(
      'button[type="submit"]'
    );

    expect(submitButton.disabled).toBe(false);
  });
});
