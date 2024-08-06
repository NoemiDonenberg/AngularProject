import { Component } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';

import { BrowserModule } from '@angular/platform-browser';
import { NgModel } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { CourseDetailsComponent } from './courses/course-details/course-details.component';

import { AddCourseComponent } from './courses/add-course/add-course.component';
import { EditCourseComponent } from './courses/edit-course/edit-course.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AllCoursesComponent } from './courses/all-courses/all-courses.component';
import { CoursCardComponent } from './courses/cours-card/cours-card.component';
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    CommonModule, RouterModule,
    RouterOutlet, RouterModule,
    RegisterComponent, CourseDetailsComponent,
    AllCoursesComponent, AddCourseComponent,
    EditCourseComponent,
    EditCourseComponent, NavBarComponent, CoursCardComponent]
})

export class AppComponent {
  title = 'Courses';
}
