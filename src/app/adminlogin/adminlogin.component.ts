import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})

export class AdminloginComponent {
  username: string = '';
  password: string = '';
  hardcodedUsername: string = 'admin';
  hardcodedPassword: string = 'password123';



  // username: string = '';
  // password: string = '';
  // hardcodedUsername: string = 'admin';
  // hardcodedPassword: string = 'password123';
  passwordVisible: boolean = false;


  constructor( private router: Router) {}

  login() {
    if (this.username === this.hardcodedUsername && this.password === this.hardcodedPassword) {
      alert('Login successful');
      this.router.navigate(['/admin-dashboard']);


    } else {
      alert('Invalid username or password');
    }
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

}
