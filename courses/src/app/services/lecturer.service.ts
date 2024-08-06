import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lecturer } from '../models/lecturer.model';

@Injectable({
  providedIn: 'root'
})
export class LecturerService {

  constructor(private http: HttpClient) { }
  public getCourseFromServer(): Observable<Lecturer[]> {
    return this.http.get<Lecturer[]>('/api/Lecturer')
  }

  public getCourseById(id: number): Observable<Lecturer> {
    console.log("server",id)
    return this.http.get<Lecturer>(`/api/Lecturer/${id}`)
  }
  private baseUrl = '/api/Lecturer';
  public updateCourse(id: number, lecturer: Lecturer): Observable<Lecturer> {
    return this.http.put<Lecturer>(`${this.baseUrl}/${id}`, Lecturer);
  }
  

  public save(p: Lecturer):Observable<Lecturer> {
    console.log("server",p)
    return this.http.post<Lecturer>('/api/Lecturer', p)
  }
  
}
