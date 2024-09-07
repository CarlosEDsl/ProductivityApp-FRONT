import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { TokenServiceService } from '../../../shared/services/token-service.service';
import { UsersServiceService } from '../../../shared/services/users-service.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-month-conclusion',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './month-conclusion.component.html',
  styleUrl: './month-conclusion.component.scss'
})
export class MonthConclusionComponent implements OnInit{

  constructor(
    private tokenService: TokenServiceService,
    private userService: UsersServiceService
  ) {}

  ngOnInit(): void {
    this.getStatistics().subscribe(m => {
      this.tasks = m;
    });
  }

  tasks: any[] = [];
  view: any[number] = [700, 400];

  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: any = 'below';
  legendTitle: any = 'Month Tasks'
  colorScheme: any = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };


  getStatistics(): Observable<{ value: number, name: string }[]> {
    return this.userService.getCurrentMonth(parseInt(this.tokenService.getId() || '0'), this.tokenService.getToken() || '')
      .pipe(
        map(m => [
          { value: m.finished, name: 'finished' },
          { value: m.notFinished, name: 'notFinished' },
          { value: m.overdue, name: 'overdue' }
        ])
      );
  }

}



