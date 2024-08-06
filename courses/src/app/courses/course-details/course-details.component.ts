import { Component, Input, OnInit } from '@angular/core';
import { Course } from '../../models/course.model';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { json } from 'stream/consumers';
import { CommonModule } from '@angular/common';
import { EditCourseComponent } from '../edit-course/edit-course.component';
import { CoursCardComponent } from '../cours-card/cours-card.component';


@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [CommonModule, EditCourseComponent, CoursCardComponent],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.scss'
})
export class CourseDetailsComponent implements OnInit {
  public course!: Course
  private courseCode!: number

  constructor(private route: ActivatedRoute, private _courseService: CourseService) { }

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.courseCode = param['id'];

      this._courseService.getCourseById(this.courseCode).subscribe({
        next: (res) => {
          this.course = res
          console.log("courrr", this.course)
        },
        error: (err) => {
          console.log(err);
        }
      })
    })
  }
}
