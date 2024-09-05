import { monthHours } from './../statistic-data';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-average-per-month',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './average-per-month.component.html',
  styleUrl: './average-per-month.component.scss'
})
export class AveragePerMonthComponent implements OnInit{

  monthHours: any[] = [{
    "name": "January",
    "value": 100
  },
  {
    "name": "Feb",
    "value": 70
  },
  {
    "name": "March",
    "value": 120
  },
  {
    "name": "April",
    "value": 100
  },
  {
    "name": "May",
    "value": 70
  },
  {
    "name": "June",
    "value": 120
  },
  {
    "name": "July",
    "value": 100
  },
  {
    "name": "August",
    "value": 70
  },
  {
    "name": "Septemper",
    "value": 120
  },
  {
    "name": "Octuber",
    "value": 100
  },
  {
    "name": "November",
    "value": 70
  },
  {
    "name": "December",
    "value": 120
  }];
  view: [number, number] = [500, 300];
  colorScheme = 'flame';
  schemeType: any = 'linear';
  gradient: boolean = false;
  xAxis: boolean = true;
  yAxis: boolean = true;
  legendTitle: string = 'Months';
  legendTitleMulti: string = 'Hours';
  legendPosition: any = 'right';
  legend: boolean = true;
  showXAxisLabel: boolean = true;
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Hours';
  xAxisLabel: string = 'Month';
  animations: boolean = false;
  showGridLines: boolean = true;
  showDataLabel: boolean = true;
  barPadding: number = 3
  tooltipDisabled: boolean = false;
  roundEdges: boolean = false;

  ngOnInit(): void {

  }

}
