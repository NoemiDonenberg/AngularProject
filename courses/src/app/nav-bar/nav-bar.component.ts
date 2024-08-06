import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Init } from 'v8';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit{
  logined: boolean = false;
  isUser: boolean = false;
  isLecturer: boolean = false;

  constructor(private authService: AuthService,private router: Router) { }
  
  ngOnInit(): void {
    this.authService.isUser$.subscribe(isLoggedIn => {
      this.isUser = isLoggedIn;

    });
    this.authService.isLecturer$.subscribe(isLoggedIn => {
      this.isLecturer = isLoggedIn;
      
    });
    // const userName = sessionStorage?.getItem('userName');
    // console.log(userName); // ידפיס 'John' אם המשתנה קיים
    // setInterval(() => {
      // this.isUser = sessionStorage.getItem('user') != null
    // }, 1000)
  }
  toLogout() {
    this.authService.logout();
    this.router.navigate(['login'])
  }

  toLogin() {
    this.router.navigate(['login'])

  }

  toRegister() {
    this.router.navigate(['register'])
  }

  toAllCourses() {
    this.router.navigate(['all-courses'])
  }

  toAddCourse() {
    this.router.navigate(['add-course'])
  }
 

 
}
