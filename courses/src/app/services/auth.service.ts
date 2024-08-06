// auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isUserSubject = new BehaviorSubject<boolean>(false);
  private isLecturerSubject = new BehaviorSubject<boolean>(false);

  isUser$ = this.isUserSubject.asObservable();
  isLecturer$ = this.isLecturerSubject.asObservable();


  constructor() {}

  loginuser() {
    // כאן אפשר להוסיף את הלוגיקה של ההתחברות
    this.isUserSubject.next(true);
  }
  loginLecturer() {
    // כאן אפשר להוסיף את הלוגיקה של ההתחברות
    this.isLecturerSubject.next(true);
  }


  logout() {
    // כאן אפשר להוסיף את הלוגיקה של ההתנתקות
    this.isUserSubject.next(false);
    this.isLecturerSubject.next(false);

  }

  // שיטה לבדוק את המצב הנוכחי של המשתמש
  isUserLoggedIn(): boolean {
    return this.isUserSubject.value||this.isLecturerSubject.value;
  }
}
