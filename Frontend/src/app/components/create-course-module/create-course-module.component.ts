import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HTTPService } from 'src/app/services/http.service';

import { ICourseModule } from 'src/app/models/course.module.model';

@Component({
  selector: 'app-create-course-module',
  templateUrl: './create-course-module.component.html',
  styleUrls: ['./create-course-module.component.css']
})

export class CreateCourseModuleComponent implements OnInit {

  constructor(
    private httpService: HTTPService,
    private router: Router,
    private activatedRoute: ActivatedRoute  ) {
    this.createForm();
  }

  public formGroup!: FormGroup;
  public statusMessage!: string;
  public courseId!: string;

  public ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.courseId = params['courseId'];
    });
  }

  private createForm(): void{
    this.formGroup = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(2)]),
      description: new FormControl('', [Validators.required, Validators.minLength(2)]),
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required)
    })
  }

  public onSubmit(): void {
    if (this.formGroup.valid) {
      const body: any = {
        courseId: this.courseId,
        module: {
          'title': this.formGroup.controls['title'].value,
          'description': this.formGroup.controls['description'].value,
          'startDate': this.formGroup.controls['startDate'].value,
          'endDate': this.formGroup.controls['endDate'].value
        }
      };

      this.httpService.createCourseModule(body).subscribe(
        (data: ICourseModule) => {
          this.formGroup.reset();
          this.router.navigate(['/courses/' + this.courseId + '/modules'])
        },
        (error: any) => {
          this.statusMessage = error.message;
        })
    } else {
      this.formGroup.markAllAsTouched();
    }
  }
}