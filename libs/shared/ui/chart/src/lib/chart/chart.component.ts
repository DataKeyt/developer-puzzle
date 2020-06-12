import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CHART_CONSTANTS } from './chart.constants';

@Component({
  selector: 'coding-challenge-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  @Input() data$: Observable<any>;
  readonly CONSTANTS = CHART_CONSTANTS;
  public chartData: any;

  constructor() {}

  ngOnInit() {
    this.data$.subscribe((res: any) => {
      this.chartData = res;
    });
  }
}
