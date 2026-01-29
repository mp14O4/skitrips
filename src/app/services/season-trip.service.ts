import { Injectable } from '@angular/core';
import {Season, Trip} from '../../data/data';
import {WINTER_25_26} from '../../data/example';

@Injectable({
  providedIn: 'root'
})
export class SeasonTripService {

  private seasons: [Season] = [WINTER_25_26];

  constructor() { }

  getSeason(seasonId?: string): Season | undefined {
    if (!seasonId) {
      return this.seasons[0];
    }
    return this.seasons.find(s => s.id === seasonId);
  }

  // TODO might not even need this
  getTrip(seasonId: string, id: string): Trip | undefined {
    const season = this.seasons.find(s => s.id === seasonId);
    return season?.trips.find(trip => trip.id === id);
  }

  addTrip(seasonId: string, trip: Trip): void {
    const season = this.getSeason(seasonId);
    if (!season) {
      throw 'Season not found.';
    }
    season.trips.push(trip);
  }

  // TODO this is not needed at first
  updateTrip(trip: Trip): void {
    // const index = this.currentSeason.trips.findIndex(t => t.id === trip.id);
    // this.currentSeason.trips.splice(index, 1);
    // this.currentSeason.trips.push(trip);
  }

  // TODO impl with storage later
  deleteTrip(id: string): void {
    // const index = this.currentSeason.trips.findIndex(t => t.id === id);
    // this.currentSeason.trips.splice(index, 1);
  }
}
