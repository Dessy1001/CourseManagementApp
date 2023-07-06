import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HTTPService } from '../../services/http.service';
import { IUser } from 'src/app/models/user.model';
import { ICourse } from 'src/app/models/course.model';

@Component({
  selector: 'app-update-course',
  templateUrl: './update-course.component.html',
  styleUrls: ['./update-course.component.css']
})

export class UpdateCourseComponent implements OnInit {

  public formGroup!: FormGroup;
  public statusMessage!: string;
  public courseId!: string;
  public users: any;
  public loading: boolean = true;

  constructor(
    private httpService: HTTPService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.createForm();
  }

  public ngOnInit(): void {
    this.courseId = this.route.snapshot.params['id'];
    this.httpService.getUsers().subscribe(
      (data: IUser[]) => {
        this.users = data;
        this.loading = false;
      },
      (error: any) => {
        console.log(error);
        this.loading = false;
      })
    this.loadCourse();
  }

  private createForm(): void {
    this.formGroup = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(2)]],
      startDate: [null,[Validators.required]],
      endDate: [null, [Validators.required]],
      userIds: [''],
    });
  }

  private loadCourse(): void {
    this.httpService.getCourse(this.courseId).subscribe(
      (course: ICourse) => {
        this.formGroup.patchValue(course);
      },
      (error: any) => {
        this.statusMessage = error.message;
      }
    );
  }

  public onSubmit(): void {
    if (this.formGroup.valid) {
      const body: any = {
        userIds: this.formGroup.controls['userIds'].value,
        updateCourse: {
          title: this.formGroup.controls['title'].value,
          description: this.formGroup.controls['description'].value,
          startDate: this.formGroup.controls['startDate'].value,
          endDate: this.formGroup.controls['endDate'].value,
        },
      };

      this.httpService.updateCourse(this.courseId, body).subscribe(
        (data: ICourse) => {
          this.formGroup.reset();
          this.router.navigateByUrl('/').then(() => {
            this.router.navigate(['/courses']);
          });
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