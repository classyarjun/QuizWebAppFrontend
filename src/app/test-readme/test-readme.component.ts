import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test-readme',
  templateUrl: './test-readme.component.html',
  styleUrls: ['./test-readme.component.css']
})
export class TestReadmeComponent {
  isAgreed: boolean = false;
  
  constructor(private router: Router) { }

  navigateToAbout() {
    this.router.navigate(['quiz-test']);
  }


}
