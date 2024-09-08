import { Component } from '@angular/core';
import { AveragePerMonthComponent } from '../average-per-month/average-per-month.component';
import { MonthConclusionComponent } from '../month-conclusion/month-conclusion.component';
import { TasksDoneComponent } from '../tasks-done/tasks-done.component';
import { HoursPerMonthComponent } from '../hours-per-month/hours-per-month.component';

@Component({
  selector: 'app-statistic-page',
  standalone: true,
  imports: [AveragePerMonthComponent, MonthConclusionComponent, TasksDoneComponent, HoursPerMonthComponent],
  templateUrl: './statistic-page.component.html',
  styleUrl: './statistic-page.component.scss'
})
export class StatisticPageComponent {

}
