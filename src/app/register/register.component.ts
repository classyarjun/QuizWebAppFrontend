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
  constructor(private fb: FormBuilder, private studentService: StudentServiceService,private router: Router) {
    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]],
      mono: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      graduateYears: ['', [Validators.required, Validators.min(1)]],
      departmentName: ['', Validators.required],
      passoutYears: ['', [Validators.required, Validators.min(2020), Validators.max(2030)]],
      collegeName: ['', Validators.required],
      interestDomain:  ['', Validators.required],// Initialize with one empty field
    });
  }

  // Form submission handler
  onSubmit() {
    if (this.studentForm.valid) {
      const student: Student = this.studentForm.value;

      this.studentService.saveStudent(student).subscribe({
        next: (response) => {
          console.log('Student saved successfully:', response);

           // Store the user data in localStorage
        localStorage.setItem('studentData', JSON.stringify(student));
          alert('Form submitted successfully..!');
          this.studentForm.reset();
          this.router.navigate(['/test-readme']);
        },
        error: (error) => {
          console.error('Error saving student:', error);
          alert('Error saving student..!');
        },
      });
    } else {
      console.log('Form is invalid');
      alert('Form is invalid');
      this.router.navigate(['']);
    }
  }
}
