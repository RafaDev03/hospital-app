import { Component } from '@angular/core';
import { IncreaseComponent } from '../../components/increase/increase.component';

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [IncreaseComponent],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.css',
})
export class ProgressComponent {}
