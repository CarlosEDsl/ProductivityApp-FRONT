import { Task } from './../../../../shared/interfaces/task';
import { Component, computed, EventEmitter, inject, input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { SnackbarService } from '../../../../shared/snack-bar/snack-bar.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

  task = input.required<Task>();
  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();
  @Output() finish = new EventEmitter();

  taskU = computed(() => this.task());
  taskId = computed(() => this.task().id);
  taskName = computed(() => this.task().name);
  taskDesc = computed(() => this.task().description);
  taskTerm = computed(() => this.task().term);
  taskCreated = computed(() => this.task().inputDate);
  taskFinish = computed(() => this.task().finishDate);

  onEdit(task:Task) {
    this.edit.emit(task);
  }

  onDelete(taskId:number | undefined) {
    this.delete.emit(taskId);
  }

  onFinish(task:Task) {
    this.finish.emit(task);
  }

  getTermFormatted(taskTerm: string): string {
    const term = new Date(taskTerm+'z');
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

  getFinishDateFormatted(date: string): string {
    let parsedDate = new Date(date+'z');
    parsedDate.setHours(parsedDate.getHours(), parsedDate.getMinutes());

    if (isNaN(parsedDate.getTime())) {
      return 'Invalid Date';
    }

    const formattedDate = parsedDate.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });

    return formattedDate;
  }
}
