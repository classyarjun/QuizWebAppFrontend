// src/app/services/student.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from 'src/modal/student';
@Injectable({
  providedIn: 'root'
})
export class StudentServiceService {

  private apiUrl = 'http://localhost:8080/api/students'; // Backend URL

  constructor(private http: HttpClient) {}

  saveStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, student);
  }

  getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl);
  }
}

