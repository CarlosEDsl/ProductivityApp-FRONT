import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { Task } from '../../../shared/interfaces/task';
import { TaskService } from '../../../shared/services/task.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-task-page',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './task-page.component.html',
  styleUrl: './task-page.component.scss'
})
export class TaskPageComponent {
  private taskService:TaskService;
  private tasks:Task[] = [];

  constructor(taskService:TaskService) {
    this.taskService = taskService;
  }

  this.taskService.getAllFromUser("2").pipe(
    tap((tasks) => {
      this.tasks
    })
  )


}
