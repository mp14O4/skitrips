import {Component, OnInit} from '@angular/core';
import {Season, Trip} from '../../../data/data';
import {SeasonTripService} from '../../services/season-trip.service';
import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {generateUuid} from '../../tooling/misc';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-trip-list',
  imports: [
    DatePipe,
    FormsModule
  ],
  templateUrl: './trip-list.component.html',
  styleUrl: './trip-list.component.scss'
})
export class TripListComponent implements OnInit {

  seasons: Season[] = [];
  selectedSeason?: Season;

  constructor(
    private readonly tripService: SeasonTripService,
    private readonly router: Router,
  ) {
  }

  ngOnInit(): void {
    this.seasons = this.tripService.getSeasons();
    if (this.seasons.length > 0) {
      this.selectedSeason = this.seasons[0];
    }
  }

  onSeasonChange(seasonId: string): void {
    if (seasonId === 'new_season') {
      const seasonName = prompt('Enter the name for the new season:');
      if (seasonName) {
        const newSeason = this.tripService.addSeason(seasonName);
        this.seasons = this.tripService.getSeasons();
        this.selectedSeason = newSeason;
      }
    } else {
      this.selectedSeason = this.seasons.find(s => s.id === seasonId);
    }
  }

  openTrip(trip: Trip) {
    this.router.navigate([`/season/${this.selectedSeason!.id}/trip/${trip.id}`]);
  }

  addTrip(): void {
    const trip: Trip = {
      id: generateUuid(),
      description: '',
      destination: '',
      people: '',
      actualPrice: 0,
      regularPrice: 0,
      skiDays: [],
      start: new Date()
    };
    this.tripService.addTrip(this.selectedSeason!.id, trip);
    this.router.navigate([`/season/${this.selectedSeason!.id}/trip/${trip.id}`]);
  }
}
