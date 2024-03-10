import { Component, OnInit } from '@angular/core';
import { DoughnutComponent } from '../../components/doughnut/doughnut.component';
import { DataGraphService } from '../../services/data-graph.service';
import { Data } from '@angular/router';
import { DataGraph } from '../../models/dataGraph.model';

@Component({
  selector: 'app-grafica1',
  standalone: true,
  imports: [DoughnutComponent],
  templateUrl: './grafica1.component.html',
  styleUrl: './grafica1.component.css',
})
export class Grafica1Component implements OnInit {
  public dataGraph!: DataGraph[];
  constructor(private dataGraphService: DataGraphService) {}
  ngOnInit(): void {
    this.dataGraph = this.dataGraphService.getDataGraph();
  }
}
