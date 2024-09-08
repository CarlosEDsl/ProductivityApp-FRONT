import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AddHours } from '../interfaces/add-hours';
import { UsersServiceService } from './users-service.service';
import { TokenServiceService } from './token-service.service';

@Injectable({
  providedIn: 'root',
})
export class PomodoroService {
  private timer: any;
  private isPlayingSubject = new BehaviorSubject<boolean>(false);
  isPlaying$ = this.isPlayingSubject.asObservable();

  constructor(private userService:UsersServiceService, private authService:TokenServiceService) {

  }
  workMinutes = 25;
  breakMinutes = 5;
  longBreakMinutes = 15;

  timerCount = 0;
  minutes = this.workMinutes;
  seconds = 0;
  lastMinuteChange!: number;

  startTimer(): void {
    if (!this.isPlayingSubject.value) {
      this.isPlayingSubject.next(true);
      this.timer = setInterval(() => {
        if (this.minutes <= 0 && this.seconds <= 0) {
          this.stopTimer();
          this.break();
        }

        if (this.seconds > 0) {
          this.seconds--;
        } else {
          this.seconds = 59;
          this.minutes--;
        }

        this.timerCount++;

        this.timerCount++;
        if(this.timerCount >= 60) {
          const moreHours:AddHours = {month: new Date().getMonth()+1, year: new Date().getFullYear(), hours:this.timerCount/60/60}
          this.userService.patch(parseInt(this.authService.getId() || '0'), moreHours, this.authService.getToken() || '').subscribe();
          this.timerCount = 0;

        }
        }, 1000);
    }
  }

  stopTimer(): void {
    if (this.isPlayingSubject.value) {
      clearInterval(this.timer);
      this.isPlayingSubject.next(false);
    }
  }

  resetTimer(): void {
    clearInterval(this.timer);
    this.seconds = 0;
    this.minutes = this.lastMinuteChange;
    this.isPlayingSubject.next(false);
  }

  break(): void {
    this.stopTimer();
    this.seconds = 0;
    this.minutes = this.breakMinutes;
    this.lastMinuteChange = this.minutes;
    this.startTimer();
  }

  work(): void {
    this.stopTimer();
    this.seconds = 0;
    this.minutes = this.workMinutes;
    this.lastMinuteChange = this.minutes;
    this.startTimer();
  }

  longBreak(): void {
    this.stopTimer();
    this.seconds = 0;
    this.minutes = this.longBreakMinutes;
    this.lastMinuteChange = this.minutes;
    this.startTimer();
  }
}
