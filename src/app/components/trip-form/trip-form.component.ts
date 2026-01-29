import { Component } from '@angular/core';
import {WINTER_25_26} from '../../../data/example';
import {Trip} from '../../../data/data';
import {DatePipe} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {SeasonTripService} from '../../services/season-trip.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-trip-form',
  imports: [
    DatePipe,
    FormsModule
  ],
  templateUrl: './trip-form.component.html',
  styleUrl: './trip-form.component.scss'
})
export class TripFormComponent {

  trip?: Trip;

  constructor(
    private route: ActivatedRoute,
    private tripService: SeasonTripService
  ) {
    const season = this.route.snapshot.params['season'];
    const trip = this.route.snapshot.params['trip'];
    this.trip = this.tripService.getTrip(season, trip);
  }


}
