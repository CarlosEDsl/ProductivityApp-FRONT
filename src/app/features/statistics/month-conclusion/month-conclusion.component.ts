import { LoadingService } from './../../../shared/services/loading.service';
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
    private userService: UsersServiceService,
    private loadingService:LoadingService
  ) {
    if(innerWidth <= 900)
      this.view = [innerWidth / 1.2, 400]
    else
      this.view = [innerWidth / 2, 400];
  }

  onResize(event:any) {
    this.view = [event.target.innerWidth / 2, 400];
  }

  ngOnInit(): void {
    this.loadingService.show();
    this.getStatistics().subscribe(m => {
      this.tasks = m;
    });
    this.loadingService.hide();
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
    domain: ['#5AA454', '#C7B42C', '#A10A28', '#AAAAAA']
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



