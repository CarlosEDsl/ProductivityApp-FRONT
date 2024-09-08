import { UsersServiceService } from './../../../shared/services/users-service.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Component, OnInit } from '@angular/core';
import { TokenServiceService } from '../../../shared/services/token-service.service';
import { HoursTime } from '../../../shared/interfaces/hours-time';
import { map, catchError, of, forkJoin } from 'rxjs';
@Component({
  selector: 'app-average-per-month',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './average-per-month.component.html',
  styleUrl: './average-per-month.component.scss'
})
export class AveragePerMonthComponent implements OnInit{

  constructor(
    private tokenService: TokenServiceService,
    private userService: UsersServiceService
  ) {
    this.view = [innerWidth / 1.35, 400];
  }

  onResize(event:any) {
    this.view = [event.target.innerWidth / 1.35, 400];
  }

  monthHours: any[] = [];

  view: [number, number] = [1200, 300];
  colorScheme = 'flame';
  schemeType: any = 'linear';
  gradient: boolean = false;
  xAxis: boolean = true;
  yAxis: boolean = true;
  legendTitle: string = "Months";
  legendPosition: any = 'right';
  legend: boolean = true;
  showXAxisLabel: boolean = true;
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Month';
  xAxisLabel: string = 'Conclusions in total month tasks(%)';
  animations: boolean = true  ;
  showGridLines: boolean = true;
  showDataLabel: boolean = true;
  barPadding: number = 3
  tooltipDisabled: boolean = false;
  roundEdges: boolean = false;


  ngOnInit(): void {
    this.getStatistics().subscribe(statistics => {
      this.monthHours = statistics;
    });
  }


  getStatistics() {
    const requests = [];
    const year = new Date().getFullYear();

    for (let i = 1; i <= 12; i++) {
        let hoursTime: HoursTime = { month: i, year };
        const request = this.userService.getMonthS(
            parseInt(this.tokenService.getId() || '0'),
            hoursTime,
            this.tokenService.getToken() || ''
        ).pipe(
            map((m) => ({
                name: this.getMonthName(i),
                value: m.avgConclusions*100
            })),
            catchError(() => {
                return of({
                    name: this.getMonthName(i),
                    value: 0
                });
            })
        );

        requests.push(request);
    }

    return forkJoin(requests).pipe(
        map(statistics => {
            return statistics;
        })
    );
}

getMonthName(monthNumber: number) {
    const months = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    return months[monthNumber - 1] || 'Mês inválido';
}

}
