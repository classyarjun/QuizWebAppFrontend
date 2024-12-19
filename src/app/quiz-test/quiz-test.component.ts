import { QuestionService } from './../../service/question.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Question } from 'src/modal/question';
import { UserScoreService } from './../../service/user-score.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-test',
  templateUrl: './quiz-test.component.html',
  styleUrls: ['./quiz-test.component.css'],
})
export class QuizTestComponent implements OnInit, OnDestroy {
  timeInSecs: number;
  ticker: any;
  countdownDisplay: string;
  questions: any[] = [];
  loading: boolean = true;
  score: number = 0;
  attemptedQuestions: number = 0;
  showResult: boolean = false;
  error: string = '';
  hasSwitchedTabs: boolean = false;

  constructor(
    private questionService: QuestionService,
    private UserScoreService: UserScoreService,
    private router: Router
  ) {
    this.timeInSecs = 2 * 60; // Set quiz duration (2 minutes for testing)
    this.countdownDisplay = this.formatTime(this.timeInSecs);
  }

  ngOnInit(): void {
    this.startTimer(this.timeInSecs);
    this.fetchQuestions();
    this.listenForTabSwitch();
  }

  ngOnDestroy(): void {
    clearInterval(this.ticker); // Clear timer when component is destroyed
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
  }

  startTimer(secs: number): void {
    this.timeInSecs = secs;
    this.ticker = setInterval(() => this.tick(), 1000); // Call tick() every second
  }

  tick(): void {
    if (this.timeInSecs > 0) {
      this.timeInSecs--;
    } else {
      clearInterval(this.ticker); // Stop the timer when time is up
      this.onSubmit(); // Automatically submit the quiz when time runs out
    }
    this.countdownDisplay = this.formatTime(this.timeInSecs); // Update timer display
  }

  formatTime(secs: number): string {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;

    return `${mins < 10 ? '0' + mins : mins}:${remainingSecs < 10 ? '0' + remainingSecs : remainingSecs}`;
  }

  fetchQuestions(): void {
    this.questionService.getQuestions().subscribe(
      (data) => {
        this.questions = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching questions:', error);
        this.loading = false;
      }
    );
  }

  onSubmit(): void {
    this.score = 0; // Reset score
    this.attemptedQuestions = 0; // Reset attempted questions count

    // Iterate over the questions to check answers
    this.questions.forEach((question) => {
      const selectedOption = (
        document.querySelector(
          `input[name="q${question.id}"]:checked`
        ) as HTMLInputElement
      )?.value;

      if (selectedOption) {
        this.attemptedQuestions++; // Increment attempted question count
        if (selectedOption === question.correctAnswer) {
          this.score++; // Increment score if answer is correct
        }
      }
    });

    // Get user data from localStorage
    const userData = JSON.parse(localStorage.getItem('studentData') || '{}');
    const quizResult: any = {
      name: userData.name?.trim(),
      email: userData.emailId,
      contactNo: userData.mono?.trim(),
      score: this.score,
      attemptQuestions: this.attemptedQuestions,
    };

    // POST quiz result to backend
    this.UserScoreService.createUserScore(quizResult).subscribe(
      (response) => {
        alert('Quiz submitted successfully!');
        this.showResult = true;
        this.router.navigate(['/']); // Redirect to the register page after quiz submission
      },
      (error) => {
        console.error('Error submitting quiz result:', error);
        alert('Something went wrong while submitting the quiz.');
      }
    );

    this.showResult = true;
  }

  listenForTabSwitch(): void {
    document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));
  }

  handleVisibilityChange(): void {
    if (document.hidden) {
      if (!this.hasSwitchedTabs) {
        this.hasSwitchedTabs = true;
        alert('Warning: Switching tabs during the quiz is not allowed!');
      }
    }
  }
}
