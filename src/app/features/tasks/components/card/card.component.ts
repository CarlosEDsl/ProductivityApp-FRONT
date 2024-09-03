import { Component, computed, EventEmitter, inject, input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Task } from '../../../../shared/interfaces/task';
import { SnackbarService } from '../../../../shared/snack-bar/snack-bar.service';

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

  taskU = computed(() => this.task());
  taskId = computed(() => this.task().id);
  taskName = computed(() => this.task().name);
  taskDesc = computed(() => this.task().description);
  taskTerm = computed(() => this.task().term);
  taskCreated = computed(() => this.task().inputDate);

  onEdit(task:Task) {
    this.edit.emit(task);
  }

  onDelete(taskId:number | undefined) {
    this.delete.emit(taskId);
  }

  getTermFormatted(taskTerm: string): string {
    const term = new Date(taskTerm);
    const now = new Date();

    // Tempo restante em segundos
    const timeToEndTerm = Math.floor((term.getTime() - now.getTime()) / 1000);

    // Calculo do tempo restante
    const days = Math.floor(timeToEndTerm / (24 * 60 * 60));
    const hours = Math.floor((timeToEndTerm % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((timeToEndTerm % (60 * 60)) / 60);
    const seconds = Math.floor(timeToEndTerm % 60);

    const formattedDays = String(days).padStart(2, '0');
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    return `${formattedDays}:${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }
}
