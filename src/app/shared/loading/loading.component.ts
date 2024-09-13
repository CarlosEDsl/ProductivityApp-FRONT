// loading.component.ts
import { Component } from '@angular/core';
import { LoadingService } from '../services/loading.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-loading',
  standalone: true,
  template: `
    <div class="loading-overlay" *ngIf="isLoading | async">
      <mat-spinner></mat-spinner>
    </div>
  `,
  imports: [MatProgressSpinnerModule, CommonModule],
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
  isLoading = this.loadingService.loading$;

  constructor(private loadingService: LoadingService) {}
}
