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
import { MatDialog } from '@angular/material/dialog';
import { Subscription, catchError } from 'rxjs';
import { SnackbarService } from '../../../shared/snack-bar/snack-bar.service';
import { EditComponent } from '../components/edit/edit.component';
import { LoadingService } from '../../../shared/services/loading.service';

@Component({
  selector: 'app-task-page',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule, CardComponent, MatPaginatorModule,
     MatFormFieldModule, MatInputModule, CreateComponent, MobileCardComponent, MatIconModule],
  templateUrl: './task-page.component.html',
  styleUrl: './task-page.component.scss'
})
export class TaskPageComponent {

  responseSnackBar = inject(SnackbarService);
  tasks: Task[] = inject(ActivatedRoute).snapshot.data['tasks'];
  taskService = inject(TaskService);
  authService:TokenServiceService = inject(TokenServiceService);
  private tasksSubscription!: Subscription;
  public screenWidth: number = 0;

  constructor(public creationDialog: MatDialog, private loadingService: LoadingService) {

  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.loadTasks();
    this.loadingService.show();
    this.tasksSubscription = this.taskService.tasks$.subscribe(tasks => {
      this.loadingService.hide();
      this.tasks = tasks;
      this.sortTasksByUrgency();
    });
  }

  sortTasksByUrgency(): void {
    this.tasks.sort((a, b) => new Date(a.term).getTime() - new Date(b.term).getTime());
  }


  loadTasks() {
    const userId = this.authService.getId() || '';
    const token = this.authService.getToken() || '';
    this.taskService.loadTasks(userId, token);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.screenWidth = window.innerWidth;
  }

  trackByTaskTerm(index: number, task: Task): string {
    return task.term;
  }

  //Paginator
  length = this.tasks.length;
  pageSize = 5;
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

  onCreate() {
    this.creationDialog.open(CreateComponent, {
      width: '90%',
      height: '80%'
    })
  }

  onDelete(taskId:number) {

    this.taskService.delete(taskId, this.authService.getToken() || '').subscribe({
      next: () => {
        this.responseSnackBar.show("Task deleted", "success")
      },
      error: () => {
        this.responseSnackBar.show("Error on task delete", "error")
      }
    });
    this.length = this.length-1;
  }

  onEdit(task:Task) {
    this.creationDialog.open(EditComponent, {
      width: '90%',
      height: '80%',
      data: task
    })
  }

  onFinish(task:Task) {

    let finishDate = new Date();
    finishDate.setHours(finishDate.getHours()-3);
    task.finishDate = finishDate.toISOString();
    task.user_id = parseInt(this.authService.getId() || '');

    let last = new Date(task.term);
    this.tasks.forEach(t => {
      if(last.getTime() < new Date(t.term).getTime()){
        last = new Date(t.term);
      }
    });
    task.term = last.toISOString();

    this.taskService.edit(task, this.authService.getToken() || '').subscribe();
  }
}
