import { Injectable } from '@angular/core';
import {Season, Trip} from '../../data/data';
import {generateUuid} from '../tooling/misc';

@Injectable({
  providedIn: 'root'
})
export class SeasonTripService {
  private readonly storageKey = 'skitrips_seasons';
  private seasons: Season[] = [];

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    const json = localStorage.getItem(this.storageKey);
    if (json) {
      const storedSeasons = JSON.parse(json) as Season[];
      // Revive date objects
      storedSeasons.forEach(season => {
        season.trips.forEach(trip => {
          trip.start = new Date(trip.start);
        });
      });
      this.seasons = storedSeasons;
    } else {
      this.seasons = [];
    }
  }

  private saveToStorage(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.seasons));
  }

  getSeason(seasonId?: string): Season | undefined {
    if (!seasonId) {
      return this.seasons[0];
    }
    return this.seasons.find(s => s.id === seasonId);
  }

  getSeasons(): Season[] {
    return this.seasons;
  }

  addSeason(seasonName: string): Season {
    const newSeason: Season = {
      id: generateUuid(),
      name: seasonName,
      trips: [],
      passes: []
    };
    this.seasons.unshift(newSeason);
    this.saveToStorage();
    return newSeason;
  }

  getTrip(seasonId: string, id: string): Trip | undefined {
    const season = this.seasons.find(s => s.id === seasonId);
    return season?.trips.find(trip => trip.id === id);
  }

  addTrip(seasonId: string, trip: Trip): void {
    const season = this.getSeason(seasonId);
    if (!season) {
      throw new Error('Season not found.');
    }
    season.trips.push(trip);
    this.saveToStorage();
  }

  updateTrip(seasonId: string, updatedTrip: Trip): void {
    const season = this.getSeason(seasonId);
    if (season) {
      const index = season.trips.findIndex(t => t.id === updatedTrip.id);
      if (index > -1) {
        season.trips[index] = updatedTrip;
        this.saveToStorage();
      }
    }
  }

  deleteTrip(seasonId: string, tripId: string): void {
    const season = this.getSeason(seasonId);
    if (season) {
      season.trips = season.trips.filter(t => t.id !== tripId);
      this.saveToStorage();
    }
  }
}
