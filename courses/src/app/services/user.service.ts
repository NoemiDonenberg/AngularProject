import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  navigate: any;

  // public products: Product[] = [{ id: 1, name: 'milk', price: 5 }, { id: 2, name: 'eggs', price: 28 }, { id: 3, name: 'coffee', price: 9 }]
  // public getProducts() {
  //   return this.products
  // }
  constructor(private http: HttpClient) { }

  public getUserFromServer(): Observable<User[]> {
    return this.http.get<User[]>('/api/Customer')
  }

  public getUserById(id: number): Observable<User> {
    return this.http.get<User>(`/api/Customer/${id}`)
  }

  public save(p: User): Observable<any> {
    // this.products.push(p)
    return this.http.post('/api/Customer', p)
  }

  loginUser(username: string, password: string): Promise<any> {
    return new Promise((res, rej) => {

      const user =
      {
        "id": 0,
        "name": username,
        "phone": "",
        "address": "",
        "email": "",
        "status": 0,
        "password": password
      }
      console.log("111",user)
console.log("http",this.http);

      this.http.post<any>("/api/Customer/login", user, {
        headers: { 'Content-Type': 'application/json' }
      })
        .subscribe({
          next: () => {
            res('');
          },
          error: (error) => {
            console.log('Login failed:', error);
            rej(error.error || { message: 'Login failed' });
          }
        });
    });
  }

  loginLecturer(lecturername: string, password: string): Promise<any> {
    return new Promise((res, rej) => {

      const lecturer =
      {
        "id": 0,
        "name": lecturername,
        "phone": "",
        "address": "",
        "email": "",
        "status": 0,
        "password": password
      }

      this.http.post<any>("/api/Lecturer/login", lecturer, {
        headers: { 'Content-Type': 'application/json' }
      })
        .subscribe({
          next: () => {
            res('');
          },
          error: (error) => {
            console.log('Login failed:', error);
            rej(error.error || { message: 'Login failed' });
          }
        });
    });
  }
  registerUser(user: any): Promise<any> {
    return new Promise((res, rej) => {
      const userToSend = {
        "id": 0,
        "name": user.userName,
        "phone": user.userPhone,
        "address": user.userAddress,
        "email": user.userMail,
        "status": 0,
        "password": user.password
      }
      
      console.log('in user serveice register', userToSend);

      this.http.post<User>("/api/Customer/register", userToSend, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .subscribe({
          next: (data: any) => {
            res(data)
          }, error: (error) => {
            rej(error)
          }
        })
    })
  }

}
