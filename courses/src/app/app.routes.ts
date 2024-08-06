import { Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CourseDetailsComponent } from './courses/course-details/course-details.component';
import { AllCoursesComponent } from './courses/all-courses/all-courses.component';
import { AddCourseComponent } from './courses/add-course/add-course.component';
import { EditCourseComponent } from './courses/edit-course/edit-course.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './authorization/auth.guard';

export const routes: Routes = [

    { path: "", redirectTo: "login", pathMatch: "full" },
    { path: "register", component: RegisterComponent },
    { path: "course-details/:id", component: CourseDetailsComponent, canActivate: [AuthGuard] },
    { path: "all-courses", component: AllCoursesComponent, canActivate: [AuthGuard] },
    { path: "add-course", component: AddCourseComponent, canActivate: [AuthGuard] },
    { path: "edit-course/:id", component: EditCourseComponent, canActivate: [AuthGuard] },
    { path: "login", component: LoginComponent },
    { path: "", component: NotFoundComponent }



];
