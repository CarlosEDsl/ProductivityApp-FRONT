import { Component, ElementRef, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PomodoroService } from './../../shared/services/pomodoro.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-pomodoro',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './pomodoro.component.html',
  styleUrls: ['./pomodoro.component.scss'],
})
export class PomodoroComponent implements OnInit, OnDestroy {
  isPlaying = false;
  private subscription!: Subscription;
  minutes!:number;
  seconds!:number;

  constructor(public pomodoroService: PomodoroService) {}

  ngOnInit(): void {
    this.subscription = this.pomodoroService.isPlaying$.subscribe((playing) => {
      this.isPlaying = playing;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  play() {
    if (!this.isPlaying) {
      this.pomodoroService.startTimer();
    } else {
      this.pomodoroService.stopTimer();
    }
  }

  resetTimer() {
    this.pomodoroService.resetTimer();
  }

  longBreak() {
    this.pomodoroService.longBreak();
  }

  break() {
    this.pomodoroService.break();
  }

  work() {
    this.pomodoroService.work();
  }

  formatTime(value: number): string {
    return value.toString().padStart(2, '0');
  }


}
