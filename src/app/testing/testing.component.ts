import { QuestionService } from './../../service/question.service';
import { Component ,OnInit, OnDestroy  } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Question } from 'src/modal/question';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css']
})

export class TestingComponent {
  questionForm: FormGroup;

  constructor(private fb: FormBuilder, private QuestionService: QuestionService) {
    this.questionForm = this.fb.group({
      questionText: ['', Validators.required],
      options: this.fb.array([this.createOption()]), // Start with one option
      correctAnswer: ['', Validators.required],
      domain: ['', Validators.required],
      questionType: ['', Validators.required], // Added questionType
    });
  }

  // Getter for options FormArray
  get options(): FormArray {
    return this.questionForm.get('options') as FormArray;
  }

  // Create an option field
  createOption(): FormGroup {
    return this.fb.group({
      option: ['', Validators.required]
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

  // Submit form
  onSubmit(): void {
    if (this.questionForm.valid) {
      const formValue = this.questionForm.value;

      // Transform options into a simple string array
      const question: Question = {
        questionText: formValue.questionText,
        options: formValue.options.map((o: any) => o.option),
        correctAnswer: formValue.correctAnswer,
        domain: formValue.domain,
        questionType: formValue.questionType, // Include questionType
      };

      this.QuestionService.createQuestion(question).subscribe({
        next: (response) => {
          alert('Question added successfully!');
          this.questionForm.reset();
          this.options.clear();
          this.addOption(); // Reinitialize with one option
        },
        error: (err) => {
          console.error('Error adding question:', err);
        }
      });
    }
  }
}
