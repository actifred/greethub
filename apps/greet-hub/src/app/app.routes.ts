import { Route } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';  
import { EventsComponent } from './pages/events/events.component';

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
