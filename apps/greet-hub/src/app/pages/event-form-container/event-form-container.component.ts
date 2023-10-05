import { Component, Inject } from '@angular/core';
import { GreetHubDataService } from '../../services/greet-hub-data.service';
import { GreetHubEvent } from '../../models/greet-hub-event';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'greet-hub-event-form-container',
  templateUrl: './event-form-container.component.html',
  styleUrls: ['./event-form-container.component.css']
})
export class EventFormContainerComponent {

  constructor(
    private _dialogRef: MatDialogRef<EventFormContainerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly _dataService: GreetHubDataService) {}

  onCancel() {
    // close parent ialog
    this._dialogRef.close();
  }

  onNewEvent(event: GreetHubEvent) {
    this._dataService.add(event);
    this._dialogRef.close();
  }
}
