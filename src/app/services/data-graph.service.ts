import { Injectable } from '@angular/core';
import { dataGraph } from '../models/dataGraph.model';

@Injectable({
  providedIn: 'root',
})
export class DataGraphService {
  constructor() {}
  getDataGraph() {
    return dataGraph;
  }
}
