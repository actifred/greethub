import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChangeDetectionStrategy } from '@angular/core';
import { GreetHubEvent } from '../../models/greet-hub-event';
import { DateTime } from 'ts-luxon';

@Component({
  selector: 'greet-hub-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventFormComponent implements OnInit {
  @Output() newEvent: EventEmitter<GreetHubEvent> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();
  public form!: FormGroup;
  public timezones: string[] = (Intl as any).supportedValuesOf('timeZone');

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(32)]],
      description: [''],
      location: ['', Validators.required],
      localTimeZoneId: ['', Validators.required],
      startDate: [new Date(), Validators.required],
      startHour: [0],
      startMinute: [0],
      endDate: [new Date(), Validators.required],
      endHour: [0],
      endMinute: [0]
    });
  }

  onCancel() {
    this.cancel.emit();
  }

  onSubmit() {
    if (this.form.valid) {

      const localStartDate = DateTime.fromObject({
        year: this.form.value.startDate.getFullYear(),
        month: this.form.value.startDate.getMonth() + 1,
        day: this.form.value.startDate.getDate(),
        hour: this.form.value.startHour,
        minute: this.form.value.startMinute
      }, this.form.value.localTimeZoneId);

      const localEndDate = DateTime.fromObject({
        year: this.form.value.endDate.getFullYear(),
        month: this.form.value.endDate.getMonth() + 1,
        day: this.form.value.endDate.getDate(),
        hour: this.form.value.endHour,
        minute: this.form.value.endMinute
      }, this.form.value.localTimeZoneId);

      const event: GreetHubEvent = {
        title: this.form.value.title,
        description: this.form.value.description,
        location: this.form.value.location,
        localTimeZoneId: this.form.value.localTimeZoneId,
        utcStartTime: localStartDate.toJSDate(),
        utcEndTime: localEndDate.toJSDate()
      };
      this.newEvent.emit(event);
    }
  }
}
