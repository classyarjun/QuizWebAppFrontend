import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserScore } from 'src/modal/user-score';
import { environment } from 'src/Environment/environment';

const NAV_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})

export class UserScoreService {


  // private apiUrl = 'http://localhost:8080/api/userscore'; // Backend API endpoint

  constructor(private http: HttpClient) {}

  // Get all User Scores
  getUserScores(): Observable<UserScore[]> {
    return this.http.get<UserScore[]>(`${NAV_URL}/userscore/all`, );
  }

  // Get a single User Score by ID
  getUserScoreById(id: number): Observable<UserScore> {
    return this.http.get<UserScore>(`${NAV_URL}/userscore/${id}`);
  }

  // Create a new User Score
  createUserScore(userScore: UserScore): Observable<UserScore> {
    return this.http.post<UserScore>(`${NAV_URL}/userscore/save`, userScore);
  }

  // Update an existing User Score
  updateUserScore(id: number, userScore: UserScore): Observable<UserScore> {
    return this.http.put<UserScore>(`${NAV_URL}/userscore/${id}`, userScore);
  }

  // Delete a User Score
  deleteUserScore(id: number): Observable<void> {
    return this.http.delete<void>(`${NAV_URL}/userscore/${id}`);
  }
}
