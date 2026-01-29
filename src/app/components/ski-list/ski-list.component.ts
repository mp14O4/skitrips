import { Component } from '@angular/core';
import {SkiDataService} from '../../services/ski-data.service';
import {Ski} from '../../../data/data';
import {Router} from '@angular/router';
import {generateUuid} from '../../tooling/misc';

@Component({
  selector: 'app-ski-list',
  imports: [],
  templateUrl: './ski-list.component.html',
  styleUrl: './ski-list.component.scss'
})
export class SkiListComponent {

  skis: Ski[] = [];

  constructor(
    private readonly skiDataService: SkiDataService,
    private readonly router: Router,
  ) {
    this.skis = this.skiDataService.getSkis();
  }

  open(ski: Ski) {
    this.router.navigate([`/ski/${ski.id}`]);
  }

  addSki(): void {
    const ski: Ski = {
      id: generateUuid(),
      brand: '', // TODO random brands would be funny
      model: '',
      year: new Date().getFullYear(),
      services: []
    };
    this.skiDataService.addSki(ski);
    this.router.navigate([`/ski/${ski.id}`]);
  }
}
