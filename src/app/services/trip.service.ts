import { Injectable } from '@angular/core';
import {Season, Trip} from '../../data/data';
import {WINTER_25_26} from '../../data/example';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  private currentSeason: Season = WINTER_25_26;

  constructor() { }

  getTrips(): Trip[] {
    return this.currentSeason.trips;
  }

  // TODO might not even need this
  getTrip(season: Season, id: string): Trip | undefined {
    return this.currentSeason.trips.find(trip => trip.id === id);
  }

  addTrip(trip: Trip): void {
    this.currentSeason.trips.push(trip);
  }

  updateTrip(trip: Trip): void {
    const index = this.currentSeason.trips.findIndex(t => t.id === trip.id);
    this.currentSeason.trips.splice(index, 1);
    this.currentSeason.trips.push(trip);
  }

  deleteTrip(id: string): void {
    const index = this.currentSeason.trips.findIndex(t => t.id === id);
    this.currentSeason.trips.splice(index, 1);
  }
}
