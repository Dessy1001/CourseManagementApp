import { Component } from '@angular/core';
import { Location } from '@angular/common'
import { HTTPService } from 'src/app/services/http.service';
import { Buffer } from 'buffer';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser } from 'src/app/models/user.model';
import { IUserGrade } from 'src/app/models/user-grade.model';

@Component({
  selector: 'app-user-grades',
  templateUrl: './user-grades.component.html',
  styleUrls: ['./user-grades.component.css']
})

export class UserGradesComponent {

  constructor(
    private httpService: HTTPService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private location: Location
  ) {
    this.createForm();
  }

  public displayedColumns: string[] = ['position', 'picture', 'email', 'firstName', 'lastName', 'phone', 'grade'];
  public users!: any;
  public loading: boolean = true;
  public imageData!: string;
  public courseId!: string;
  public formGroup!: FormGroup;
  public lectureId!: string;
  public statusMessage!: string;

  public ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.courseId = params['courseId'];
      this.lectureId = params['lectureId'];
    });

    this.httpService.getLecture(this.lectureId).subscribe(
      (lectureData: any) => {
        const userGrades = lectureData.userGrades;

        this.httpService.getUsersFromCourse(this.courseId).subscribe(
          (data: IUser[]) => {
            this.users = data;
            for (let user of this.users) {
              const base64String = Buffer.from(user.picture).toString('base64');
              const imageUrl = `data:image/png;base64, ${base64String}`;
              user.picture = imageUrl;
              this.addUserControl(user);
              const userGrade = userGrades.find((grade: any) => grade.userId === user.id);
              
              if (userGrade) {
                this.formGroup.get(`user${user.id}`)?.setValue(userGrade.grade);
              }
            }
            this.loading = false;
          }, (error: any) => {
            this.statusMessage = error.message;
            this.loading = false;
          });
      }, (error: any) => {
        this.statusMessage = error.message;
        this.loading = false;
      }
    )
  };

  private createForm(): void {
    this.formGroup = this.formBuilder.group({});
  }

  public addUserControl(user: IUser): void {
    const controlName = `user${user.id}`;
    this.formGroup.addControl(controlName, this.formBuilder.control('', [Validators.required, Validators.min(0), Validators.max(10)]));
  }

  public getUserGradeControl(index: number): any {
    if (this.users && index < this.users.length && this.users[index].id) {
      const controlName = `user${this.users[index].id}`;
      return this.formGroup.get(controlName);
    }
    return null;
  }

  public onSubmit(): void {
    console.log
    if (this.formGroup.valid) {
      const userGradesArray: { userId: string; grade: number; }[] = [];
      this.users.forEach((user: IUser) => {
        const userGrade = {
          userId: user.id,
          grade: this.formGroup.get(`user${user.id}`)?.value,
        };
        userGradesArray.push(userGrade);
      });

      const body: any = {
        lectureId: this.lectureId,
        userGrades: userGradesArray,
      };

      this.httpService.postLectureGrades(body).subscribe(
        (data: IUserGrade[]) => {
          alert('Grades saved!');
          this.location.back()
        },
        (error: any) => {
          console.log(error);
        }
      );
    } else {
      this.formGroup.markAllAsTouched();
    }
  }
}
