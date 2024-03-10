import { Component } from '@angular/core';
import { IncreaseComponent } from '../../components/increase/increase.component';

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [IncreaseComponent],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.css',
})
export class ProgressComponent {
  progreso1: number = 10;
  progreso2: number = 10;

  get getProgreso1() {
    return `${this.progreso1}%`;
  }

  get getProgreso2() {
    return `${this.progreso2}%`;
  }
}
