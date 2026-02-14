import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TripFormComponent } from './components/trip-form/trip-form.component';
import { SkiFormComponent } from './components/ski-form/ski-form.component';
import {TripListComponent} from './components/trip-list/trip-list.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'season/:season/trip/:trip', component: TripFormComponent },
    { path: 'season/:season', component: TripListComponent },
    { path: 'ski/:id', component: SkiFormComponent },
    { path: '**', redirectTo: '' }
];
