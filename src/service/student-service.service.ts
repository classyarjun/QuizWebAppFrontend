// src/app/services/student.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from 'src/modal/student';
import { environment } from 'src/Environment/environment';

const NAV_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class StudentServiceService {

  // private apiUrl = 'http://localhost:8080/api/students'; // Backend URL

  constructor(private http: HttpClient) {}

  saveStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(`${NAV_URL}/students`, student);
  }

  getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${NAV_URL}/students`);
  }
}




    // return this.http.post<Question>(`${NAV_URL}/questions`, question);
