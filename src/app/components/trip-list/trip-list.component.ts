import { Component } from '@angular/core';
import {Trip} from '../../../data/data';
import {TripService} from '../../services/trip.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-trip-list',
  imports: [
    DatePipe
  ],
  templateUrl: './trip-list.component.html',
  styleUrl: './trip-list.component.scss'
})
export class TripListComponent {

  trips: Trip[] = [];

  constructor(private readonly tripService: TripService) {
    this.trips = tripService.getTrips();
  }

}
