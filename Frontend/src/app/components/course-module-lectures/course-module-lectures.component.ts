import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

import { HTTPService } from 'src/app/services/http.service';
import { AuthService } from 'src/app/services/auth.service';

import { ICourseModuleLecture } from 'src/app/models/course-module.lecture.model';

import { CreateCourseModuleLectureComponent } from '../create-course-module-lecture/create-course-module-lecture.component';

@Component({
  selector: 'app-course-module-lectures',
  templateUrl: './course-module-lectures.component.html',
  styleUrls: ['./course-module-lectures.component.css']
})

export class CourseModuleLecturesComponent implements OnInit {

  constructor(
    private router: Router,
    private httpService: HTTPService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private dialog: MatDialog,
  ) { }

  public displayedColumns: string[] = ['position', 'title', 'date', 'assignment', 'update', 'delete'];
  public lectures!: ICourseModuleLecture[]
  public loading: boolean = true;
  public resumeBase64: any;
  public user = this.authService.userValue();
  public moduleId!: string;
  public courseId!: string;

  public ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.moduleId = params['moduleId'];
      this.courseId = params['courseId'];
    });

    this.httpService.getCourseModuleLectures(this.moduleId).subscribe(
      (data: any) => {
        this.lectures = data;
        this.loading = false;
      },
      (error: any) => {
        this.loading = false;
      })
  }

  public updateCourseModuleLecture(lecture: ICourseModuleLecture): void {
    this.router.navigate(['/courses/' + this.courseId + '/modules/' + this.moduleId + '/lectures/' + lecture.id + '/update'])
  }

  public deleteCourseModuleLecture(lecture: ICourseModuleLecture): void {
    this.httpService.deleteCourseModuleLecture(lecture).subscribe(
      (data: string) => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/courses']);
        });
      },
      (error: any) => {
        console.log(error.message);
      })
  }

  public getUserGradeAssignment(lecture: ICourseModuleLecture): void {
    this.router.navigate(['/courses/' + this.courseId + '/modules/' + this.moduleId + '/lectures/' + lecture.id + '/user-grades'])
  }
}
