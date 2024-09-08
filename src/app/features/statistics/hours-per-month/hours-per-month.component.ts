import { HoursTime } from './../../../shared/interfaces/hours-time';
import { UsersServiceService } from './../../../shared/services/users-service.service';
import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { TokenServiceService } from '../../../shared/services/token-service.service';
import { catchError, forkJoin, map, Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common'; // Importação do CommonModule

@Component({
  selector: 'app-hours-per-month',
  standalone: true,
  imports: [NgxChartsModule, CommonModule],
  templateUrl: './hours-per-month.component.html',
  styleUrls: ['./hours-per-month.component.scss']
})
export class HoursPerMonthComponent implements OnInit {

  monthHours:any = [{ name: 'HoursAmount', series:[] }];
  view: [number, number] = [700, 300];

  legend: boolean = false;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Month';
  yAxisLabel: string = 'Hours';
  timeline: boolean = true;

  colorScheme: any = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor(private userService: UsersServiceService, private authService: TokenServiceService)
  {
    this.view = [innerWidth / 1.35, 400];
  }

  onResize(event:any) {
    this.view = [event.target.innerWidth / 1.35, 400];
  }


  ngOnInit(): void {
    this.getAllUserMonths().subscribe((m) => {
      this.monthHours = m;
    });
  }

  getAllUserMonths() {
    const response: { name: string; series: any[] }[] = [];
    const observables: Observable<any>[] = [];

    for (let i = 0; i < 12; i++) {
      let date = new Date();
      date.setMonth(date.getMonth() - i);
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      let stats: HoursTime = {
        month: month,
        year: year
      };

      const request = this.userService
        .getMonthS(
          parseInt(this.authService.getId() || '0'),
          stats,
          this.authService.getToken() || ''
        )
        .pipe(
          map((m) => ({
            name: `${month}/${year}`,
            value: m.totalHours
          })),
          catchError(() =>
            of({
              name: `${month}/${year}`,
              value: 0
            })
          )
        );

      observables.push(request);
    }

    return forkJoin(observables).pipe(
      map((statistics) => {
        // Inverter a ordem dos dados
        const reversedStatistics = statistics.reverse();

        // Construir o response com a lista invertida
        response.push({
          name: 'TotalHours',
          series: reversedStatistics
        });
        return response;
      })
    );
  }

}
