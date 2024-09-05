import { Component } from '@angular/core';
import { AveragePerMonthComponent } from '../average-per-month/average-per-month.component';

@Component({
  selector: 'app-statistic-page',
  standalone: true,
  imports: [AveragePerMonthComponent],
  templateUrl: './statistic-page.component.html',
  styleUrl: './statistic-page.component.scss'
})
export class StatisticPageComponent {

}
