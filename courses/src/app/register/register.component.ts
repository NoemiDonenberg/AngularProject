import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  user: User = new User;
  phonePattern = /^(0[23489]\d{1,2}-?\d{7}|05\d-?\d{7})$/;

  userForm: FormGroup = new FormGroup({
    "userName": new FormControl(this.user.name, [Validators.required, Validators.minLength(2)]),
    "userPhone": new FormControl(this.user.phone, [Validators.required, Validators.pattern(this.phonePattern)]),
    "userAddress": new FormControl(this.user.adress, [Validators.required]),
    "userMail": new FormControl(this.user.mail, [Validators.required, Validators.email]),
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
    console.log('this.userForm.value', this.userForm.value);

    this._userService.registerUser(this.userForm.value).then(() => {
      localStorage.setItem("user", 'there is user')
      this.authService.loginuser();
      this._router.navigate(['all-courses']);
    }).catch((error: { error: { error: string; }; }) => {
      Swal.fire({
        icon: "error", title: "an error accured"
      })
    })
  }

  constructor(private authService: AuthService, private _userService: UserService, private _router: Router) { }


  ngOnInit(): void {
    this.userForm.controls['userName'].setValue(history.state.name);
  }


}
