import { Route } from '@angular/router';
import { HomeComponent } from './home/home.component';  
import { EventsComponent } from './events/events.component';

export const appRoutes: Route[] = [
    {
        path: 'events',
        component: EventsComponent
    },
    {
        path: '',
        component: HomeComponent
    }
];
