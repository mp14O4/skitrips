import { Component } from '@angular/core';
import { TripListComponent } from '../components/trip-list/trip-list.component';
import { SkiListComponent } from '../components/ski-list/ski-list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    TripListComponent,
    SkiListComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  activeTab: 'trips' | 'skis' = 'trips';

  selectTab(tab: 'trips' | 'skis') {
    this.activeTab = tab;
  }
}
