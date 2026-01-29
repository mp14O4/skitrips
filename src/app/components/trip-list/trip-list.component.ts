import { Component } from '@angular/core';
import {Season, Trip} from '../../../data/data';
import {SeasonTripService} from '../../services/season-trip.service';
import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-trip-list',
  imports: [
    DatePipe
  ],
  templateUrl: './trip-list.component.html',
  styleUrl: './trip-list.component.scss'
})
export class TripListComponent {

  season?: Season;

  constructor(
    private readonly tripService: SeasonTripService,
    private readonly router: Router,
  ) {
    this.season = tripService.getSeason();
  }

  openTrip(trip: Trip) {
    this.router.navigate([`/season/${this.season!.id}/trip/${trip.id}`]);
  }

  addTrip(): void {
    this.router.navigate([`/season/${this.season!.id}/trip/new`]);
  }
}
