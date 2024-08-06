import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { EventEmitter } from 'stream';
import { AuthGuard } from '../../authorization/auth.guard';
import { AuthService } from '../../services/auth.service';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-cours-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cours-card.component.html',
  styleUrl: './cours-card.component.scss'
})
export class CoursCardComponent implements OnInit {
  @Input() course!: Course
  @Input() courseCategory!: string
  @Input() showBtn: boolean = false;
  public showSilabus: boolean = false;
  isLecturer: boolean = false;

  constructor(private router: Router, private auth: AuthService) {
    console.log('in card:', this.course);

  }
  ngOnInit(): void {
    this.auth.isLecturer$.subscribe(isLoggedIn => {
      this.isLecturer = isLoggedIn;

    });
  }

  public toggleSilabus(): void {
    this.showSilabus = !this.showSilabus;
  }

  public showDetails(p: any) {
    this.router.navigate([this.newMethod(), p]);
  }

  public showLess() {
    this.showSilabus = !this.showSilabus
  }

  private newMethod(): any {
    return newFunction();

    function newFunction(): any {
      return "course-details";
    }
  }
  toEdit() {
    this.router.navigate(["edit-course", this.course.id]);
  }
}
