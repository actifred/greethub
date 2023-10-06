import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventFormContainerComponent } from './event-form-container.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GreetHubDataService } from '../../services/greet-hub-data.service';
import { of } from 'rxjs';
import { EventFormComponent } from '../event-form/event-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('EventFormContainerComponent', () => {
  let component: EventFormContainerComponent;
  let fixture: ComponentFixture<EventFormContainerComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatInputModule, MatButtonModule],
      declarations: [EventFormContainerComponent, EventFormComponent],
      providers: [
          {
            provide: MatDialogRef,
            useValue: {}
          },
          {
            provide: MAT_DIALOG_DATA,
            useValue: {
              title: 'Test Event Title',
            }
          },
          {
            provide: GreetHubDataService,
            useValue: {
              events$: of([])
            }
          }
      ]
    });
    await TestBed.compileComponents();
    fixture = TestBed.createComponent(EventFormContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
