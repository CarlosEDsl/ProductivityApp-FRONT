import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { Task } from '../../../shared/interfaces/task';
import { TaskService } from '../../../shared/services/task.service';
import { CommonModule } from '@angular/common';
import { TokenServiceService } from '../../../shared/services/token-service.service';
import { ActivatedRoute } from '@angular/router';
import { CardComponent } from '../components/card/card.component';

@Component({
  selector: 'app-task-page',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule, CardComponent],
  templateUrl: './task-page.component.html',
  styleUrl: './task-page.component.scss'
})
export class TaskPageComponent {
  tasks:any = signal<Task[]>(inject(ActivatedRoute).snapshot.data['tasks']);
  taskService = inject(TaskService);
  authService:TokenServiceService = inject(TokenServiceService);

  ngOnInit() {}
  trackByTaskTerm(index: number, task: Task): string {
    return task.term.toString(); // Substitua 'term' pela propriedade única do objeto 'task' que você deseja usar para tracking
  }

}
