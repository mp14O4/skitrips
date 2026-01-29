import { Component } from '@angular/core';
import {Ski} from '../../../data/data';

@Component({
  selector: 'app-ski-form',
  imports: [],
  templateUrl: './ski-form.component.html',
  styleUrl: './ski-form.component.scss'
})
export class SkiFormComponent {

  ski: Ski = {
    id: '',
    name: ''
  };

}
