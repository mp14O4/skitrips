import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TripFormComponent } from './components/trip-form/trip-form.component';
import { SkiFormComponent } from './components/ski-form/ski-form.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'trip/new', component: TripFormComponent },
    { path: 'trip/edit/:id', component: TripFormComponent },
    { path: 'ski/new', component: SkiFormComponent },
    { path: 'ski/edit/:id', component: SkiFormComponent },
    { path: '**', redirectTo: '' }
];
