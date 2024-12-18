import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserScore } from 'src/modal/user-score';


@Injectable({
  providedIn: 'root'
})

export class UserScoreService {
  private apiUrl = 'http://localhost:8080/api/userscore'; // Backend API endpoint


  constructor(private http: HttpClient) {}

  // Get all User Scores
  getUserScores(): Observable<UserScore[]> {
    return this.http.get<UserScore[]>(`${this.apiUrl}/all`, );
  }
  
  // Get a single User Score by ID
  getUserScoreById(id: number): Observable<UserScore> {
    return this.http.get<UserScore>(`${this.apiUrl}/${id}`);
  }

  // Create a new User Score
  createUserScore(userScore: UserScore): Observable<UserScore> {
    return this.http.post<UserScore>(`${this.apiUrl}/save`, userScore);
  }

  // Update an existing User Score
  updateUserScore(id: number, userScore: UserScore): Observable<UserScore> {
    return this.http.put<UserScore>(`${this.apiUrl}/${id}`, userScore);
  }

  // Delete a User Score
  deleteUserScore(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
