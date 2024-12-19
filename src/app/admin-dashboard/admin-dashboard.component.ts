import { QuestionService } from './../../service/question.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Question } from 'src/modal/question';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent {
  questions: any[] = [];
  loading: boolean = true;
  score: number = 0;

  ticker: any;

  attemptedQuestions: number = 0;
  showResult: boolean = false;
  error: string = '';
  questionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private QuestionService: QuestionService,private router: Router)
    {
    this.questionForm = this.fb.group({
      questionText: ['', Validators.required],
      options: this.fb.array([this.createOption()]), // Start with one option
      correctAnswer: ['', Validators.required],
      domain: ['', Validators.required],
      questionType: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.fetchQuestions();
  }
  // Getter for options FormArray
  get options(): FormArray {
    return this.questionForm.get('options') as FormArray;
  }

  // Create an option field
  createOption(): FormGroup {
    return this.fb.group({
      option: ['', Validators.required],
    });
  }

  // Add a new option field
  addOption(): void {
    this.options.push(this.createOption());
  }

  // Remove an option field
  removeOption(index: number): void {
    this.options.removeAt(index);
  }

  fetchQuestions(): void {
    this.QuestionService.getQuestions().subscribe(
      (data) => {
        this.questions = data;
        this.loading = false;
      },
      (error) => {
        this.error = 'Failed to load questions. Please try again later.';
        console.error('Error fetching questions:', error);
        this.loading = false;
      }
    );
  }

  // Submit form
  onSubmit(): void {
    if (this.questionForm.valid) {
      const formValue = this.questionForm.value;
      const question: Question = {
        questionText: formValue.questionText,
        options: formValue.options.map((o: any) => o.option),
        correctAnswer: formValue.correctAnswer,
        domain: formValue.domain,
        questionType: formValue.questionType, // Include questionType
      };

      this.QuestionService.createQuestion(question).subscribe({
        next: (response) => {
          this.questionForm.reset();
          this.options.clear();
          this.addOption();
          this.fetchQuestions();
          alert('Question added successfully!');
        },
        error: (err) => {
          console.error('Error adding question:', err);
        },
      });
    }
  }

  onDelete(id: number): void {
    if (confirm('Are you sure you want to delete this question?')) {
      this.QuestionService.deleteQuestion(id).subscribe({
        next: () => {
          this.questions = this.questions.filter((question) => question.id !== id);
          this.fetchQuestions();
          console.log('Question deleted successfully');
        },
        error: (err) => {
          console.error('Error deleting question', err);
        },
      });
    }
  }

  logout() {
    // Show a confirmation dialog
    const confirmLogout = confirm("Are you sure you want to log out?");

    if (confirmLogout) {
      // Perform any logout logic here (if needed)
      // Navigate to the home page
      this.router.navigate(['']); // Adjust the path as needed
    }
  }




}
