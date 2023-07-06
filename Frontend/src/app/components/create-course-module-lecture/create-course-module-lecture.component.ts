import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HTTPService } from 'src/app/services/http.service';
import { Location } from '@angular/common'

import { ICourseModuleLecture } from 'src/app/models/course-module.lecture.model';

@Component({
  selector: 'app-create-course-module-lecture',
  templateUrl: './create-course-module-lecture.component.html',
  styleUrls: ['./create-course-module-lecture.component.css']
})

export class CreateCourseModuleLectureComponent implements OnInit {
  
  constructor(
    private httpService: HTTPService,
    private activatedRoute: ActivatedRoute,
    private location: Location) {
    this.createForm();
  }

  public formGroup!: FormGroup;
  public statusMessage!: string;
  public moduleId!: string;

  public ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.moduleId = params['moduleId'];
    });
  }

  private createForm(): void {
    this.formGroup = new FormGroup({
      title: new FormControl(''),
      date: new FormControl('')
    })
  }

  public onSubmit(): void {
    if (this.formGroup.valid) {
      const body: any = {
        moduleId: this.moduleId,
        lecture: {
          'title': this.formGroup.controls['title'].value,
          'date': this.formGroup.controls['date'].value,
        }
      };

      this.httpService.createCourseModuleLecture(body).subscribe(
        (data: ICourseModuleLecture) => {
          this.formGroup.reset();
          this.location.back();
        },
        (error: any) => {
          this.statusMessage = error.message;
        })
    } else {
      this.formGroup.markAllAsTouched();
    }
  }
}
