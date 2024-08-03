import { Component, computed, EventEmitter, input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Task } from '../../../../shared/interfaces/task';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

  task = input.required<Task>();
  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();


  taskName = computed(() => this.task().name);
  taskDesc = computed(() => this.task().description);
  taskTerm = computed(() => this.task().term);
  taskCreated = computed(() => this.task().inputDate);

  onEdit() {
    this.edit.emit();
  }

  onDelete() {
    this.delete.emit();
  }
}
