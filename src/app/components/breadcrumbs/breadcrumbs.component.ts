import {Component, Input} from '@angular/core';

export interface BreadcrumbStep {
  name: string;
  ref?: string;
}

@Component({
  selector: 'app-breadcrumbs',
  imports: [],
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.scss'
})
export class BreadcrumbsComponent {

  @Input()
  steps: BreadcrumbStep[] = [];
}
