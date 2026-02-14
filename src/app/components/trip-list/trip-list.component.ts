import {Component, OnInit} from '@angular/core';
import {Season, Trip} from '../../../data/data';
import {SeasonTripService} from '../../services/season-trip.service';
import {DatePipe} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {generateUuid} from '../../tooling/misc';
import {FormsModule} from '@angular/forms';
import {BreadcrumbsComponent, BreadcrumbStep} from '../breadcrumbs/breadcrumbs.component';

@Component({
  selector: 'app-trip-list',
  imports: [
    DatePipe,
    FormsModule,
    BreadcrumbsComponent
  ],
  templateUrl: './trip-list.component.html',
  styleUrl: './trip-list.component.scss'
})
export class TripListComponent implements OnInit {

  seasons: Season[] = [];
  selectedSeason?: Season;
  protected breadcrumbSteps: BreadcrumbStep[];

  constructor(
    private route: ActivatedRoute,
    private readonly tripService: SeasonTripService,
    private readonly router: Router,
  ) {
    const seasonId = this.route.snapshot.params['season'];
    this.selectedSeason = this.tripService.getSeason(seasonId);

    this.breadcrumbSteps = [
      {
        name: this.selectedSeason?.name ?? ''
      }
    ]
  }

  ngOnInit(): void {
  }

  onSeasonChange(seasonId: string): void {
    if (seasonId === 'new_season') {
      const seasonName = prompt('Geben Sie den Namen für die neue Saison ein:');
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
