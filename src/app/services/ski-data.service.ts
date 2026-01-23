import { Injectable } from '@angular/core';
import {Ski} from '../../data/data';
import {SKIS} from '../../data/example';

@Injectable({
  providedIn: 'root'
})
export class SkiDataService {

  private skis: Ski[] = [...SKIS];

  constructor() { }

  getSkis(): Ski[] {
    return this.skis;
  }

  getSki(id: string): Ski | undefined {
    return this.skis.find(ski => ski.id === id);
  }

  addSki(ski: Ski): void {
    // In a real app, this would be an HTTP call
  }

  updateSki(ski: Ski): void {
    // In a real app, this would be an HTTP call
  }

  deleteSki(id: string): void {
    // In a real app, this would be an HTTP call
  }
}
