import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { Course } from '../models/course.model';
import { Lecturer } from '../models/lecturer.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private readonly _serviceName = "/courses";

  constructor(private http: HttpClient, private _router: Router) { }

  public getCourseFromServer(): Observable<Course[]> {
    return this.http.get<Course[]>('/api/Courses')
  }

  public getCourseById(id: number): Observable<Course> {
    const url = `${this.baseUrl}/${id}`;
    console.log("server", id)
    return this.http.get<Course>(`/api/Courses/${id}`)
  }
  
  private baseUrl = '/api/Courses';
  public updateCourse(id: number, course: Course): Observable<Course> {
    // שליחת בקשת HTTP PUT לכתובת המתאימה לפי ה-ID
    return this.http.put<Course>(`${this.baseUrl}/${id}`, course);
  }

  public save(p: Course): Observable<Course> {
    return this.http.post<Course>('/api/Courses', p)
  }

}
