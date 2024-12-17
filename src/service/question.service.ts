import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from 'src/modal/question';

@Injectable({
  providedIn: 'root'
})

export class QuestionService {

  private baseUrl = 'http://localhost:8080/api/questions'; // Backend API URL

  constructor(private http: HttpClient) { }

  // Create a new question
  createQuestion(question: Question): Observable<Question> {
    return this.http.post<Question>(`${this.baseUrl}`, question);
  }

  // Get all questions
  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.baseUrl}`);
  }

  // Get a question by ID
  getQuestionById(id: number): Observable<Question> {
    return this.http.get<Question>(`${this.baseUrl}/${id}`);
  }

  // Update a question
  updateQuestion(id: number, question: Question): Observable<Question> {
    return this.http.put<Question>(`${this.baseUrl}/${id}`, question);
  }

  // Delete a question
  deleteQuestion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
