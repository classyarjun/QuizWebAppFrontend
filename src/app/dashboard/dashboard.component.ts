import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  student: any; // Property to hold student data

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Retrieve student data from localStorage on component initialization
    const studentData = localStorage.getItem('studentData');
    if (studentData) {
      this.student = JSON.parse(studentData); // Store the student data in the property
      console.log('Retrieved Student Data from LocalStorage:', this.student);
    } else {
      console.log('No student data found in LocalStorage.');
      this.student = null; // Set to null if no data found
      this.router.navigate(['/register']);
    }
  }
}
