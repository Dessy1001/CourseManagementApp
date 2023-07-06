import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICourseModule } from 'src/app/models/course.module.model';
import { HTTPService } from 'src/app/services/http.service';

@Component({
  selector: 'app-update-course-module',
  templateUrl: './update-course-module.component.html',
  styleUrls: ['./update-course-module.component.css']
})

export class UpdateCourseModuleComponent implements OnInit {

  public formGroup!: FormGroup;
  public statusMessage!: string;
  public courseId!: string;
  public moduleId!: string;

  constructor(
    private httpService: HTTPService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.createForm();
  }

  private createForm(): void {
    this.formGroup = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(2)]),
      description: new FormControl('', [Validators.required, Validators.minLength(2)]),
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required)
    });
  }

  public ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.courseId = params['courseId'];
      this.moduleId = params['moduleId'];
      this.loadModule();
    });
  }

  private loadModule(): void {
    this.httpService.getModuleById(this.moduleId).subscribe(
      (module: ICourseModule) => {
        this.formGroup.patchValue(module);
      },
      (error: any) => {
        this.statusMessage = error.message;
      }
    );
  }

  public onSubmit(): void {
    if (this.formGroup.valid) {
      const body: any = {
        updateModule: {
          title: this.formGroup.controls['title'].value,
          description: this.formGroup.controls['description'].value,
          startDate: this.formGroup.controls['startDate'].value,
          endDate: this.formGroup.controls['endDate'].value
        }
      };
  
      this.httpService.updateCourseModule(this.moduleId, body).subscribe(
        (data: any) => {
          this.router.navigate(['/courses/' + this.courseId + '/modules']);
        },
        (error: any) => {
          this.statusMessage = error.message;
        }
      );
    } else {
      this.formGroup.markAllAsTouched();
    }
  }
}  
