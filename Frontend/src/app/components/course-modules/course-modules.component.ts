import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

import { HTTPService } from 'src/app/services/http.service';
import { AuthService } from 'src/app/services/auth.service';

import { ICourseModule } from 'src/app/models/course.module.model';
import { CreateCourseModuleComponent } from '../create-course-module/create-course-module.component';

@Component({
  selector: 'app-course-modules',
  templateUrl: './course-modules.component.html',
  styleUrls: ['./course-modules.component.css']
})
export class CourseModulesComponent {

  constructor(
    private router: Router,
    private httpService: HTTPService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private dialog: MatDialog,
  ) { }

  public displayedColumns: string[] = ['position','title', 'startDate', 'endDate', 'lectures', 'update', 'delete'];
  public modules!: ICourseModule[]
  public loading: boolean = true;
  public user = this.authService.userValue();
  public courseId!: string;
  public resumeBase64: any;

  public ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.courseId = params['courseId'];
    });

    this.httpService.getCourseModules(this.courseId).subscribe(
      (data: ICourseModule[]) => {
        this.modules = data;
        this.loading = false;
      },
      (error: any) => {
        console.log(error);
        this.loading = false;
      })
  }

  public updateCourseModule(module: ICourseModule): void {
    this.router.navigate(['/courses', this.courseId, 'modules', module.id, 'update']);
  }

  public deleteCourseModule(module: ICourseModule): void {
    this.httpService.deleteCourseModule(module).subscribe(
      (data: string) => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/courses']);
        });
      },
      (error: any) => {
        console.log(error.message);
      })
  }

  public getLectures(module: ICourseModule): void {
    this.router.navigate(['/courses/' + this.courseId + '/modules/' + module.id + '/lectures']);
  }
}
