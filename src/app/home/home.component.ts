import { Component } from '@angular/core';
import {TripListComponent} from '../components/trip-list/trip-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TripListComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
