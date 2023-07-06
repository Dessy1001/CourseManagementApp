import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HTTPService } from 'src/app/services/http.service';
import { Location } from '@angular/common';
import { ICourseModuleLecture } from 'src/app/models/course-module.lecture.model';

@Component({
  selector: 'app-update-course-module-lecture',
  templateUrl: './update-course-module-lecture.component.html',
  styleUrls: ['./update-course-module-lecture.component.css']
})

export class UpdateCourseModuleLectureComponent {
  
  constructor(
    private httpService: HTTPService,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {
    this.createForm();
  }

  public formGroup!: FormGroup;
  public statusMessage!: string;
  public moduleId!: string;
  public lectureId!: string;

  public ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.moduleId = params['moduleId'];
      this.lectureId = params['lectureId'];
      this.loadLecture();
    });
  }

  private createForm(): void {
    this.formGroup = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(2)]),
      date: new FormControl('', Validators.required)
    });
  }

  private loadLecture(): void {
    this.httpService.getLectureById(this.lectureId).subscribe(
      (lecture: ICourseModuleLecture) => {
        this.formGroup.patchValue({
          title: lecture.title,
          date: lecture.date
        });
      },
      (error: any) => {
        this.statusMessage = error.message;
      }
    );
  }

  public onSubmit(): void {
    if (this.formGroup.valid) {
      const body: any = {
        updateLecture: {
        title: this.formGroup.controls['title'].value,
        date: this.formGroup.controls['date'].value
        }
      };
  
      this.httpService.updateCourseModuleLecture(this.lectureId, body).subscribe(
        (data: ICourseModuleLecture) => {
          this.formGroup.reset();
          this.location.back();
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