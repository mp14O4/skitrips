import { Component } from '@angular/core';
import {SeasonTripService} from '../../services/season-trip.service';
import {Season} from '../../../data/data';

@Component({
  selector: 'app-season-list',
  imports: [],
  templateUrl: './season-list.component.html',
  styleUrl: './season-list.component.scss'
})
export class SeasonListComponent {

  seasons: Season[];

  constructor(private readonly seasonTripService: SeasonTripService) {
    this.seasons = this.seasonTripService.getSeasons();
  }

  protected readonly indexedDB = indexedDB;
}
