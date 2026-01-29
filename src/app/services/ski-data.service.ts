import { Injectable } from '@angular/core';
import {Ski} from '../../data/data';
import {SKIS} from '../../data/example';

@Injectable({
  providedIn: 'root'
})
export class SkiDataService {
  private readonly storageKey = 'skitrips_skis';
  private skis: Ski[] = [];

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    const json = localStorage.getItem(this.storageKey);
    if (json) {
      const storedSkis = JSON.parse(json) as Ski[];
      // Revive date objects
      storedSkis.forEach(ski => {
        ski.services.forEach(service => {
          service.date = new Date(service.date);
        });
      });
      this.skis = storedSkis;
    } else {
      this.skis = [];
    }
  }

  private saveToStorage(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.skis));
  }

  getSkis(): Ski[] {
    return this.skis;
  }

  getSki(id: string): Ski | undefined {
    return this.skis.find(ski => ski.id === id);
  }

  addSki(ski: Ski): void {
    this.skis.push(ski);
    this.saveToStorage();
  }

  updateSki(ski: Ski): void {
    const index = this.skis.findIndex(s => s.id === ski.id);
    if (index > -1) {
      this.skis[index] = ski;
      this.saveToStorage();
    }
  }

  deleteSki(id: string): void {
    this.skis = this.skis.filter(ski => ski.id !== id);
    this.saveToStorage();
  }
}
