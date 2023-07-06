import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { ICourse } from 'src/app/models/course.model';

import { UserRole } from 'src/app/models/user.model';

import { forkJoin } from 'rxjs';

import { HTTPService } from 'src/app/services/http.service';
import { AuthService } from 'src/app/services/auth.service';

import { MatDialog } from '@angular/material/dialog';
import { CreateCourseComponent } from '../create-course/create-course.component';
import { ICourseModule } from 'src/app/models/course.module.model';
import { UpdateCourseComponent } from '../update-course/update-course.component';

interface ModulesAndGrades {
  module: ICourseModule;
  grade: number;
}

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})

export class CoursesComponent implements OnInit {

  constructor(
    private httpService: HTTPService,
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthService
  ) { }

  public displayedColumns: string[] = ['position', 'title', 'startDate', 'endDate', 'modules', 'update', 'delete'];
  public displayedColumnsUser: string[] = ['moduleTitle', 'moduleGrade'];
  public courses: ICourse[] = [];
  public loading: boolean = true;
  public resumeBase64: any;
  public user = this.authService.userValue();
  public moduleTitles: string[] = [];
  public courseModulesAndGrades: { course: ICourse; modulesAndGrades: ModulesAndGrades[] }[] = [];

  public ngOnInit(): void {
    if (this.user.role === UserRole.Admin) {
      this.httpService.getCourses().subscribe(
        (data: ICourse[]) => {
          this.courses = data;
          this.loading = false;
        },
        (error: any) => {
          this.loading = false;
        }
      );
    } else if (this.user.role === UserRole.End_User) {
      this.httpService.getUsersCourses(this.user.id).subscribe(
        (data: ICourse[]) => {
          this.courses = data;
          this.loading = false;
          this.fetchModuleTitles();
        },
        (error: any) => {
          this.loading = false;
        }
      );
    }
  }

  public openCreateCourse(): void {
    const dialogRef = this.dialog.open(CreateCourseComponent, {});

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  public updateCourse(course: ICourse): void {
    this.router.navigate(['/courses', course.id, 'update']);
  }

  public deleteCourse(course: ICourse): void {
    this.httpService.deleteCourse(course).subscribe(
      (data: any) => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/courses']);
        });
      },
      (error: any) => {
        console.log(error.message);
      }
    );
  }

  public getModules(course: ICourse): void {
    this.router.navigate(['/courses/' + course.id + '/modules']);
  }

  private fetchModuleTitles(): void {
    const requests = [];

    for (const course of this.courses) {
      if (!course.id) {
        continue;
      }

      const request = this.httpService.getCourseModules(course.id);
      requests.push(request);
    }

    forkJoin(requests).subscribe(
      (results: any[]) => {
        for (let i = 0; i < results.length; i++) {
          const modules = results[i];
          const course = this.courses[i];
          course.modules = modules;
          const modulesAndGrades: ModulesAndGrades[] = [];

          for (const module of modules) {
            if (!module.id || !this.user.id) {
              continue;
            }

            this.httpService.getModuleGrade(module.id, this.user.id).subscribe(
              (data: number) => {
                modulesAndGrades.push({ module, grade: data });
              },
              (error: any) => {
                console.error(error);
              }
            );
          }
          this.courseModulesAndGrades.push({ course, modulesAndGrades });
          console.log(this.courseModulesAndGrades);
        }
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
}
