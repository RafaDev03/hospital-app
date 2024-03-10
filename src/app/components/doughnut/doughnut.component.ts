import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';
import { ChartEvent } from 'chart.js/dist/core/core.plugins';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-doughnut',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './doughnut.component.html',
  styleUrl: './doughnut.component.css',
})
export class DoughnutComponent implements OnInit {
  @Input() titulo: string = '';
  @Input() data: number[] = [];

  ngOnInit(): void {
    this.doughnutChartData.datasets = [{ data: this.data }];
  }
  // Doughnut
  public doughnutChartLabels: string[] = [
    'Download Sales',
    'In-Store Sales',
    'Mail-Order Sales',
  ];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [],
  };
  public doughnutChartType: ChartType = 'doughnut';

  // events
  public chartClicked({
    event,
    active,
  }: {
    event: ChartEvent;
    active: object[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: ChartEvent;
    active: object[];
  }): void {
    console.log(event, active);
  }
}
