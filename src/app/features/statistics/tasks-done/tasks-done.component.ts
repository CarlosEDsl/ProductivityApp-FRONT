import { Component } from '@angular/core';
import { TaskService } from '../../../shared/services/task.service';
import { TokenServiceService } from '../../../shared/services/token-service.service';

@Component({
  selector: 'app-tasks-done',
  standalone: true,
  imports: [],
  templateUrl: './tasks-done.component.html',
  styleUrl: './tasks-done.component.scss'
})
export class TasksDoneComponent {
  taskCount:number = 0;

  constructor(private taskService:TaskService, private authService:TokenServiceService) {

  }

  tasks = this.taskService.getAllFromUser(this.authService.getId() || '', this.authService.getToken() || '').subscribe((t) => {
    t.forEach((task) => {
      if(task.finishDate){
        this.taskCount++;
      }
    })
  })



}
