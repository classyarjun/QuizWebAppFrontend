import { Component,OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-quiz-test',
  templateUrl: './quiz-test.component.html',
  styleUrls: ['./quiz-test.component.css']
})

export class QuizTestComponent implements OnInit, OnDestroy {
  timeInSecs: number;
  ticker: any;
  countdownDisplay: string;

  constructor() {
    this.timeInSecs = 45 * 60; // 5 minutes in seconds
    this.countdownDisplay = this.formatTime(this.timeInSecs);
  }

  ngOnInit(): void {
    this.startTimer(this.timeInSecs);
  }

  ngOnDestroy(): void {
    clearInterval(this.ticker);
  }

  startTimer(secs: number): void {
    this.timeInSecs = secs;
    this.ticker = setInterval(() => this.tick(), 1000);
  }

  tick(): void {
    if (this.timeInSecs > 0) {
      this.timeInSecs--;
    } else {
      clearInterval(this.ticker);
      this.startTimer(5 * 60); // Restart timer for 5 minutes
    }
    this.countdownDisplay = this.formatTime(this.timeInSecs);
  }

  formatTime(secs: number): string {
    const days = Math.floor(secs / 86400);
    secs %= 86400;
    const hours = Math.floor(secs / 3600);
    secs %= 3600;
    const mins = Math.floor(secs / 60);
    secs %= 60;

    return (
      (days < 10 ? '0' : '') + hours + ':' +
      (mins < 10 ? '0' : '') + mins + ':' +
      (secs < 10 ? '0' : '') + secs
    );
  }
}
