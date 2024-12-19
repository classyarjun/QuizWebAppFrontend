import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from 'src/modal/question';
import { environment } from 'src/Environment/environment';

const NAV_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})

export class QuestionService {

  // private baseUrl = 'http://localhost:8080/api/questions'; // Backend API URL

  constructor(private http: HttpClient) { }

  // Create a new question
  createQuestion(question: Question): Observable<Question> {
    // return this.http.post<Question>(`${this.baseUrl}`, question);
    return this.http.post<Question>(`${NAV_URL}/questions`, question);
  }

  // Get all questions
  // getQuestions(): Observable<Question[]> {
  //   return this.http.get<Question[]>(`${NAV_URL}/questions`,);
  // }
  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(`${NAV_URL}/questions/all-types`,);
  }

  // Get a question by ID
  getQuestionById(id: number): Observable<Question> {
    return this.http.get<Question>(`${NAV_URL}/questions/${id}`);
  }

  // Update a question
  updateQuestion(id: number, question: Question): Observable<Question> {
    return this.http.put<Question>(`${NAV_URL}/questions/${id}`, question);
  }

  // Delete a question
  deleteQuestion(id: number): Observable<void> {
    return this.http.delete<void>(`${NAV_URL}/questions/${id}`);
  }



}
