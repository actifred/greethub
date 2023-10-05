import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventFormContainerComponent } from './event-form-container.component';

describe('EventFormContainerComponent', () => {
  let component: EventFormContainerComponent;
  let fixture: ComponentFixture<EventFormContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventFormContainerComponent]
    });
    fixture = TestBed.createComponent(EventFormContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
