import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';
import { HeaderInterceptor } from '../header.interceptor';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true }]
})
export class LoginComponent {
  user: User = new User;

  nameInvalid: boolean;
  nameInvalidValue: string;

  passwordInvalid: boolean;
  passwordInvalidValue: string;

  userForm: FormGroup = new FormGroup({
    "userName": new FormControl(this.user.name, [Validators.required, Validators.minLength(2)]),
    "password": new FormControl(this.user.password, [Validators.required, Validators.minLength(2)])
  })

  isLecturer: boolean = false;
  courseName: string = '';
  setIsLecturer(): void {
    if (this.isLecturer)
      this.userForm.removeControl("courseName")
    else
      this.userForm.addControl("courseName", new FormControl(this.courseName, [Validators.required]))
    this.isLecturer = !this.isLecturer;
  }

  onSubmit() {
    if (this.userForm.invalid) {
      return;
    }
    let serviceFunc: (arg0: any, arg1: any) => Promise<any>;
  
if (!this.isLecturer)
{
  this._userService.loginUser(this.userForm.value.userName, this.userForm.value.password).then(() => {
    localStorage.setItem("user", 'there is user')
    this._authService.loginuser();
    this._router.navigate(['all-courses']);
  }).catch((error) => {
    console.log('error', error);

    if (error?.error === 'user') {
      Swal.fire({
        icon: "error", title: "user name is not valid", showConfirmButton: true, showDenyButton: true,
        text: `Are you a ${this.isLecturer ? 'student' : 'lecturer'}?`,
        confirmButtonText: `I'm a ${this.isLecturer ? 'student' : 'lecturer'}`,
        denyButtonText: "I want to register"
      }).then((res) => {
        if (res.isConfirmed) {
          this.isLecturer = !this.isLecturer
        } else {
          this._router.navigate(
            ['/register'],
            { state: { name: this.userForm.controls['userName'].value } }
          )
        }
      })
    } else if (error?.error === 'user') {
      Swal.fire({ icon: "error", title: "Oops...", text: "password is not valid" })
    } else {
    Swal.fire({ icon: "error", title: "Oops...", text: "something is wrong" })
  }
})
}
else{
  this._userService.loginLecturer(this.userForm.value.userName, this.userForm.value.password).then(() => {
    localStorage.setItem("user", 'there is user')
    this._authService.loginLecturer();
    this._router.navigate(['all-courses']);
  }).catch((error) => {
    console.log('error', error);

    if (error?.error === 'user') {
      Swal.fire({
        icon: "error", title: "user name is not valid", showConfirmButton: true, showDenyButton: true,
        text: `Are you a ${this.isLecturer ? 'student' : 'lecturer'}?`,
        confirmButtonText: `I'm a ${this.isLecturer ? 'student' : 'lecturer'}`,
        denyButtonText: "I want to register"
      }).then((res) => {
        if (res.isConfirmed) {
          this.isLecturer = !this.isLecturer
        } else {
          this._router.navigate(
            ['/register'],
            { state: { name: this.userForm.controls['userName'].value } }
          )
        }
      })
    } else if (error?.error === 'user') {
      Swal.fire({ icon: "error", title: "Oops...", text: "password is not valid" })
    } else {
    Swal.fire({ icon: "error", title: "Oops...", text: "something is wrong" })
  }
})
}
    
}

constructor(private _userService: UserService, private _router: Router, private _authService: AuthService) { }
}

