import { StudentServiceService } from './../../service/student-service.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { Student } from 'src/modal/student';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  studentForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentServiceService,
    private router: Router
  ) {
    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]],
      mono: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      graduateYears: ['', [Validators.required, Validators.min(1)]],
      departmentName: ['', Validators.required],
      passoutYears: ['', [Validators.required, Validators.min(2020), Validators.max(2030)]],
      collegeName: ['', Validators.required],
      interestDomain: ['', Validators.required]
    });
  }

  // Form submission handler
  onSubmit() {
    if (this.studentForm.valid) {
      const student: Student = this.studentForm.value;

      this.studentService.saveStudent(student).subscribe({
        next: (response) => {
          console.log('User registered successfully:', response);
          // Reset error and form
          this.errorMessage = null;
          localStorage.setItem('studentData', JSON.stringify(student));
          alert('Registration successful!');
          this.studentForm.reset();
          this.router.navigate(['/test-readme']);
        },
        error: (error) => {
          console.error('Error during registration:', error);
          // Check if the backend is sending a message and set the error message
          if (error.status === 409) {
            const errorData = error.error;
            if (errorData) {
              // Assuming the backend error structure is { error: 'email' or 'mobile' }
              this.errorMessage = errorData.error;
            } else {
              this.errorMessage = 'A conflict occurred during registration.';
            }
          } else {
            this.errorMessage = 'This Email Id or Mobile Number Already Exists';
          }
        }
      });
    } else {
      console.log('Form is invalid');
      this.errorMessage = 'Please fill in the required fields.';
    }
  }

}

 