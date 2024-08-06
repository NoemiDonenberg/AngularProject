
import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms'; // תוקן: שימוש ב-FormArray וב-Validators
import { Course, LearningType } from '../../models/course.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-add-course',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {
  public addForm1!: FormGroup;
  course: Course = new Course();
  selectedFile!: File;
  categories: Category[] = [];
  learningTypes: any[] = [{ value: LearningType.Frontal, title: 'frontal' }, { value: LearningType.Zoom, title: 'zoom' }];

  constructor(
    private fb: FormBuilder, // תוקן: שימוש ב-FormBuilder
    private _courseService: CourseService,
    private router: Router,
    private _categoriesServise: CategoriesService
  ) { }

  ngOnInit(): void {
    this.addForm1 = this.fb.group({
      name: ['', Validators.required], // תוקן: הגדרת Validators.required
      categori: [''],
      lessons: [''],
      start: ['', Validators.required], // תוקן: הגדרת Validators.required
      cilibus: this.fb.array([this.createCilibusField()]),  // תוקן: שימוש ב-FormArray עם שדה סילבוס
      type: [''],
      lecturerId: [''],
      id: [''],
      img: ['']
    });

    this._categoriesServise.getCategoriesFromServer().subscribe({
      next: (res) => { this.categories = res; }
    });
  }

  createCilibusField(): FormGroup { // תוקן: יצירת שדה סילבוס כ-FormGroup
    return this.fb.group({
      item: ['', Validators.required] // תוקן: הגדרת Validators.required
    });
  }

  get cilibus(): FormArray {
    return this.addForm1.get('cilibus') as FormArray; // תוקן: שימוש ב-FormArray
  }

  addCilibusField(): void { // תוקן: פונקציה להוספת שדה סילבוס
    this.cilibus.push(this.createCilibusField());
  }

  removeCilibusField(index: number): void { // תוקן: פונקציה להסרת שדה סילבוס
    this.cilibus.removeAt(index);
  }

  public save(): void {
    if (this.addForm1.valid) { // תוקן: בדיקת תקינות הטופס
      const p: Course = this.addForm1.value;
      p.cilibus = this.cilibus.value.map((c: any) => c.item);  // תוקן: מיפוי פרטי הסילבוס למערך מחרוזות

      this._courseService.save(p).subscribe({
        next: (res) => {
          console.log(res);
          console.log("save");
          this.router.navigate(['/all-courses']);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "New course has been saved",
            showConfirmButton: false,
            timer: 1500
          });
        },
        error: (err) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "An error occurred while saving the course"
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
      this.addForm1.patchValue({
        img: file.name // אם צריך לשמור את שם הקובץ במודל
      });
    }
  }
  
}

