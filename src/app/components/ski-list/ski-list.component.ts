import { Component } from '@angular/core';
import {SkiDataService} from '../../services/ski-data.service';
import {Ski} from '../../../data/data';
import {Router} from '@angular/router';

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
}
