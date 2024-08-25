import { Component, HostListener, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Task } from '../../../shared/interfaces/task';
import { TaskService } from '../../../shared/services/task.service';
import { CommonModule } from '@angular/common';
import { TokenServiceService } from '../../../shared/services/token-service.service';
import { ActivatedRoute } from '@angular/router';
import { CardComponent } from '../components/card/card.component';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CreateComponent } from '../components/create/create.component';
import { MobileCardComponent } from '../components/card/mobile/mobile.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-task-page',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule, CardComponent, MatPaginatorModule,
     MatFormFieldModule, MatInputModule, CreateComponent, MobileCardComponent, MatIconModule],
  templateUrl: './task-page.component.html',
  styleUrl: './task-page.component.scss'
})
export class TaskPageComponent {
  tasks: Task[] = inject(ActivatedRoute).snapshot.data['tasks'];
  taskService = inject(TaskService);
  authService:TokenServiceService = inject(TokenServiceService);

  public screenWidth: number = 0;

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.screenWidth = window.innerWidth;  // Atualiza a largura quando a tela é redimensionada
  }

  trackByTaskTerm(index: number, task: Task): string {
    return task.term.toString();
  }

  //Paginator
  length = this.tasks.length;
  pageSize = 3;
  pageIndex = 0;

  hidePageSize = true;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent!: PageEvent;

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }

  get paginatedTasks(): Task[] {
    const startIndex = this.pageIndex * this.pageSize;
    return this.tasks.slice(startIndex, startIndex + this.pageSize);
  }
}
