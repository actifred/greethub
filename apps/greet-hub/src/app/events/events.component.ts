import { Component } from '@angular/core';
import { GreetHubDataService } from '../services/greet-hub-data.service';

@Component({
  selector: 'greet-hub-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent {

  constructor(private _dataService: GreetHubDataService) {}

}
