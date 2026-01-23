import { Injectable } from '@angular/core';
import {Ski} from '../../data/data';

@Injectable({
  providedIn: 'root'
})
export class SkiService {

  constructor() { }

  getSkis(): Ski[] {
    return [];
  }

  getSki(id: string): Ski | undefined {
    return undefined;
  }

  addSki(ski: Ski): void {
  }

  updateSki(ski: Ski): void {
  }

  deleteSki(id: string): void {
  }
}
