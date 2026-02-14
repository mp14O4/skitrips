import {Component, OnInit} from '@angular/core';
import {Ski, Trip} from '../../../data/data';
import {DatePipe, Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {SeasonTripService} from '../../services/season-trip.service';
import {FormsModule} from '@angular/forms';
import {SkiDataService} from '../../services/ski-data.service';
import {SkiDay} from "../../../data/data";
import {BreadcrumbsComponent, BreadcrumbStep} from '../breadcrumbs/breadcrumbs.component';

@Component({
  selector: 'app-trip-form',
  imports: [
    DatePipe,
    FormsModule,
    BreadcrumbsComponent
  ],
  templateUrl: './trip-form.component.html',
  styleUrl: './trip-form.component.scss'
})
export class TripFormComponent implements OnInit {

  trip?: Trip;
  startDateString?: string;
  seasonId: string;

  availableSkis: Ski[] = [];
  showDayDestinationInput: Map<string, boolean> = new Map();
  breadcrumbSteps: BreadcrumbStep[];

  constructor(
    private route: ActivatedRoute,
    private tripService: SeasonTripService,
    private skiDataService: SkiDataService,
    private location: Location,
  ) {
    this.seasonId = this.route.snapshot.params['season'];
    const tripId = this.route.snapshot.params['trip'];

    const season = this.tripService.getSeason(this.seasonId);

    this.trip = this.tripService.getTrip(this.seasonId, tripId);
    this.availableSkis = this.skiDataService.getSkis();

    this.breadcrumbSteps = [
      {
        name: season?.name ?? '',
        ref: `/season/c35b76df-e5cc-48c3-b9a4-35bfc00627e1`
      },
      {
        name: this.trip?.destination ?? ''
      }
    ]
  }

  save(): void {
    if (this.trip && this.seasonId) {
      if (this.trip.id.startsWith('new-')) { // Check if it's a new trip
        this.tripService.addTrip(this.seasonId, this.trip);
      } else {
        this.tripService.updateTrip(this.seasonId, this.trip);
      }
      this.back(); // Go back after saving
    }
  }
  ngOnInit(): void {
    if (this.trip) {
      this.startDateString = this.toYYYYMMDD(this.trip.start);
      this.trip.skiDays.forEach(day => {
        this.showDayDestinationInput.set(day.id, !!day.dayDestination && day.dayDestination !== this.trip?.destination);
      });
    }
  }

  private toYYYYMMDD(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  updateTripStartDate(): void {
    if (this.trip && this.startDateString) {
      this.trip.start = new Date(this.startDateString);
    }
  }

  isSkiSelected(skiDay: SkiDay, ski: Ski): boolean {
    return skiDay.ski.some(selectedSki => selectedSki.id === ski.id);
  }

  onSkiSelectionChange(event: any, skiDay: SkiDay, ski: Ski) {
    if (event.target.checked) {
      if (!this.isSkiSelected(skiDay, ski)) {
        skiDay.ski.push(ski);
      }
    } else {
      const index = skiDay.ski.findIndex(selectedSki => selectedSki.id === ski.id);
      if (index > -1) {
        skiDay.ski.splice(index, 1);
      }
    }
  }

  addSkiDay(): void {
    if (this.trip) {
      const newSkiDay: SkiDay = {
        id: `new-${Date.now()}`, // Simple unique ID
        ski: [],
        dayDestination: this.trip.destination // Default to trip's main destination
      };
      this.trip.skiDays.push(newSkiDay);
      this.showDayDestinationInput.set(newSkiDay.id, false); // New day, hide destination override by default
    }
  }

  removeSkiDay(skiDayToRemove: SkiDay): void {
    if (this.trip) {
      this.trip.skiDays = this.trip.skiDays.filter(day => day.id !== skiDayToRemove.id);
      this.showDayDestinationInput.delete(skiDayToRemove.id); // Remove from map when day is removed
    }
  }

  toggleDayDestinationInput(skiDayId: string): void {
    const currentState = this.showDayDestinationInput.get(skiDayId);
    this.showDayDestinationInput.set(skiDayId, !currentState);
  }

  back() {
    this.location.back();
  }
}
