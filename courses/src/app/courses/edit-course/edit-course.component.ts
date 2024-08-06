import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CourseService } from '../../services/course.service';
import { Course, LearningType } from '../../models/course.model';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../models/category.model';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-edit-course',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-course.component.html',
  styleUrl: './edit-course.component.scss'
})
export class EditCourseComponent implements OnInit {
  public editForm1!: FormGroup;
  course: Course = new Course();
  selectedFile!: File;
  id!: number;
  categories: Category[] = [];
  learningTypes: any[] = [{ value: LearningType.Frontal, title: 'frontal' }, { value: LearningType.Zoom, title: 'zoom' }];

  constructor(
    private fb: FormBuilder,
    private _courseService: CourseService,
    private router: Router,
    private _actroute: ActivatedRoute,
    private _categoriesServise: CategoriesService
  ) { }

  ngOnInit(): void {
    this._actroute.paramMap.subscribe(params => {
      this.id = parseInt(params.get('id') || '', 10);
      this._courseService.getCourseById(this.id).subscribe(c => {
        this.course = c;
        console.log('course', c);

        this.initializeForm();
      });
    });

    this._categoriesServise.getCategoriesFromServer().subscribe({
      next: (res) => { this.categories = res; }
    });
  }

  initializeForm(): void {
    this.editForm1 = this.fb.group({
      name: [this.course.name, Validators.required],
      categoryId: [this.course.categoryId, Validators.required],
      lessons: [this.course.lessons],
      start: [this.course.start ? this.formatDate(this.course.start) : '', Validators.required],
      cilibus: this.fb.array((this.course.cilibus || []).map(item => this.fb.group({ item: [item, Validators.required] }))),
      type: [this.course.type],
      lecturerId: [this.course.lecturerId],
      id: [this.course.id],
      img: [this.course.img]
    });
  }

  formatDate(date: any): string {
    if (date instanceof Date) {
      // פורמט תאריך ל-YYYY-MM-DD
      return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().substring(0, 10);
    } else if (typeof date === 'string') {
      return new Date(date).toISOString().substring(0, 10);
    } else {
      return '';
    }
  }

  get cilibus(): FormArray {
    return this.editForm1.get('cilibus') as FormArray;
  }

  addCilibusField(): void {
    this.cilibus.push(this.createCilibusField());
  }

  removeCilibusField(index: number): void {
    this.cilibus.removeAt(index);
  }

  createCilibusField(): FormGroup {
    return this.fb.group({
      item: ['', Validators.required]
    });
  }

  public save(): void {
    if (this.editForm1.valid) {
      const p: Course = this.editForm1.value;
      p.cilibus = this.cilibus.value.map((c: any) => c.item);
      console.log('p(course) in save', p);
      // p.type = parseInt(p.type);
      this._courseService.updateCourse(p.id || 0, p).subscribe({
        next: (res) => {
          this.router.navigate(['/all-courses']);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Course has been updated",
            showConfirmButton: false,
            timer: 1500
          });
        },
        error: (err) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "An error occurred while updating the course"
          });
          console.log(err);
        }
      });
    }
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.editForm1.patchValue({
        img: file.name
      });
    }
  }
}
