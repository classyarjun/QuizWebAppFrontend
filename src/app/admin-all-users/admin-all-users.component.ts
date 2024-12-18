import { Component, OnInit } from '@angular/core';
// src/app/components/user-score-list/user-score-list.component.ts
import { UserScoreService } from 'src/service/user-score.service';
import { UserScore, Status } from 'src/modal/user-score';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-all-users',
  templateUrl: './admin-all-users.component.html',
  styleUrls: ['./admin-all-users.component.css']
})
export class AdminAllUsersComponent  implements OnInit {
  userScores: UserScore[] = []; // Array to hold user scores
  errorMessage: string = ''; // Error message for API failure

  constructor(private userScoreService: UserScoreService,private router: Router) {}

  ngOnInit(): void {
    this.fetchUserScores();
  }

  fetchUserScores(): void {
    this.userScoreService.getUserScores().subscribe({
      next: (data: UserScore[]) => {
        this.userScores = data; // Assign API response to array
        console.log('Fetched User Scores:', this.userScores);
      },
      error: (error) => {
        this.errorMessage = 'Failed to fetch user scores';
        console.error('Error fetching user scores:', error);
      }
    });
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
