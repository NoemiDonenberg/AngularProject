// import { Component, OnInit } from '@angular/core';
// import { Course } from '../../models/course.model';
// import { CourseService } from '../../services/course.service';
// import { Observable } from 'rxjs';
// import { ActivatedRoute, Router } from '@angular/router';
// import { CommonModule } from '@angular/common';
// // import { CourseDetailsComponent } from "../course-details/course-details.component";
// import { RouterModule } from '@angular/router'; // Import RouterModule correctly

// import { CourseDetailsComponent } from '../course-details/course-details.component';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; // ייבוא CUSTOM_ELEMENTS_SCHEMA
// import { CoursCardComponent } from '../cours-card/cours-card.component';

// @Component({
//   selector: 'app-all-courses',
//   standalone: true,
//   templateUrl: './all-courses.component.html',
//   styleUrl: './all-courses.component.scss',
//   imports: [CommonModule, RouterModule, CoursCardComponent],
//   schemas: [CUSTOM_ELEMENTS_SCHEMA] // הוספת CUSTOM_ELEMENTS_SCHEMA
// })
// export class AllCoursesComponent implements OnInit {
//   public selectedCourse!: Course;
//   public coursesList?: Course[];
//   public showSilabus: boolean = false;






//   private source$: Observable<any> = new Observable((observer) => {
//     observer.next("fdgjhdfgjk")
//     observer.next(2)
//     setTimeout(() => {
//       observer.next(3)
//     }, 3000)
//     observer.complete()
//     observer.next(4);
//   })

//   constructor(private router: Router, private _courseService: CourseService) {
//   }
//   userId?: number;


//   ngOnInit(): void {

//     this._courseService.getCourseFromServer().subscribe({
//       next: (res) => {
//         this.coursesList = res

//       }
//     })
//     this.source$.subscribe({
//       next: (res) => {
//         console.log(res);
//       },
//       error: (err) => {
//         console.log(err);
//       },
//       complete: () => {
//         console.log('finish');
//       }
//     })
//   }
//   private newMethod1(): string {
//     return "course-details";
//   }
// }
import { Component, OnInit } from '@angular/core';
import { Course } from '../../models/course.model';
import { CourseService } from '../../services/course.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CourseDetailsComponent } from '../course-details/course-details.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CoursCardComponent } from '../cours-card/cours-card.component';
import { FormsModule } from '@angular/forms';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-all-courses',
  standalone: true,
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.scss'],
  imports: [CommonModule, RouterModule, CoursCardComponent, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AllCoursesComponent implements OnInit {
  public selectedCourse!: Course;
  public coursesList: Course[] = [];
  public filteredCoursesList: Course[] = [];
  public showSilabus: boolean = false;

  public filters = {
    courseName: '',
    courseCategory: '',
    courseOption: ''
  };

  public courseCategories: Category[] = [];
  public courseOptions: any[] = [{ value: 1, title: 'zoom' }, { value: 0, title: 'frontal' }];

  private source$: Observable<any> = new Observable((observer) => {
    observer.next("fdgjhdfgjk")
    observer.next(2)
    setTimeout(() => {
      observer.next(3)
    }, 3000)
    observer.complete()
    observer.next(4);
  })

  constructor(private router: Router, private _courseService: CourseService, private _categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this._categoriesService.getCategoriesFromServer().subscribe({
      next: (res) => {
        this.courseCategories = res;
      }
    });
    this._courseService.getCourseFromServer().subscribe({
      next: (res) => {
        this.coursesList = res;
        this.applyFilters();
      }
    });
    this.source$.subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('finish');
      }
    });
  }

  applyFilters(): void {
    this.filteredCoursesList = this.coursesList.filter(course => {
      return (this.filters.courseName ? course.name.toLowerCase().includes(this.filters.courseName.toLowerCase()) : true) &&
        (this.filters.courseCategory ? course.categoryId?.toString() === this.filters.courseCategory : true) &&
        (this.filters.courseOption ? course.type?.toString() === this.filters.courseOption : true);
    });
  }

  findCategory(id: number): string {
    return this.courseCategories.find(c => c.id === id)?.name || 'none'
  }
}
