import { QuestionService } from './../../service/question.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Question } from 'src/modal/question';
import { UserScoreService } from './../../service/user-score.service';

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

  // Loading state
  constructor(
    private questionService: QuestionService,
    private UserScoreService: UserScoreService
  ) {
    this.timeInSecs = 45 * 60; // 5 minutes in seconds
    this.countdownDisplay = this.formatTime(this.timeInSecs);
  }

  ngOnInit(): void {
    this.startTimer(this.timeInSecs);
    this.fetchQuestions();
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
      (days < 10 ? '0' : '') +
      hours +
      ':' +
      (mins < 10 ? '0' : '') +
      mins +
      ':' +
      (secs < 10 ? '0' : '') +
      secs
    );
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
    this.attemptedQuestions = 0; // Reset attempted count
    console.log('Form submitted!'); // Add logic to evaluate answers here

    // Iterate over questions to check answers
    this.questions.forEach((question) => {
      const selectedOption = (
        document.querySelector(
          `input[name="q${question.id}"]:checked`
        ) as HTMLInputElement
      )?.value;

      if (selectedOption) {
        this.attemptedQuestions++; // Increment attempted question count
        if (selectedOption === question.correctAnswer) {
          this.score++; // Increment score if the answer is correct
        }
      }
    });

    const userData = JSON.parse(localStorage.getItem('studentData') || '{}');
    const quizResult: any = {
      name: userData.name?.trim(), // Trim extra spaces
      email: userData.emailId, // Ensure email is lowercase
      contactNo: userData.mono?.trim(), // Trim spaces in contact number
      score: this.score,
      attemptQuestions: this.attemptedQuestions,
    };

    // POST result to backend
    this.UserScoreService.createUserScore(quizResult).subscribe(
      (response) => {
        alert('Quiz submitted successfully!');
        this.showResult = true;
      },
      (error) => {
        console.error('Error submitting quiz result:', error);
        alert('Something went wrong while submitting the quiz.');
      }
    );

    this.showResult = true;
    console.log(
      `Score: ${this.score}, Attempted Questions: ${this.attemptedQuestions}`
    );
  }
}
