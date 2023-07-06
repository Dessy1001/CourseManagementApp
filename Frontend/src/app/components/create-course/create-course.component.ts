import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HTTPService } from 'src/app/services/http.service';

import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ICourse } from 'src/app/models/course.model';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})

export class CreateCourseComponent implements OnInit {

  constructor(
    private httpService: HTTPService,
    private router: Router,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<CreateCourseComponent>
  ) {
    this.createForm();
  }

  public formGroup!: FormGroup;
  public statusMessage!: string;
  public users: any;
  public loading: boolean = true;
  public selectedUsers: string[] = [];

  public ngOnInit(): void {
    this.httpService.getUsers().subscribe(
      (data: any) => {
        console.log(data);
        this.users = data;
        this.loading = false;
      },
      (error: any) => {
        console.log(error);
        this.loading = false;
      })
  }

  private createForm(): void {
    this.formGroup = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(2)]),
      description: new FormControl('', [Validators.required, Validators.minLength(2)]),
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required),
      userIds: new FormControl('')
    })
  }

  public onSubmit(): void {
    if (this.formGroup.valid) {
      const body: any = {
        'title': this.formGroup.controls['title'].value,
        'description': this.formGroup.controls['description'].value,
        'startDate': this.formGroup.controls['startDate'].value,
        'endDate': this.formGroup.controls['endDate'].value,
        'userIds': this.formGroup.controls['userIds'].value
      };

      this.httpService.createCourse(body).subscribe(
        (data: ICourse) => {
          this.router.navigateByUrl('/').then(() => {
            this.router.navigate(['/courses']);
            this.dialogRef.close();
          });
        },
        (error: any) => {
          this.statusMessage = error.message;
        })
    } else {
      this.formGroup.markAllAsTouched();
    }
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }

  public getFullNames(items: any[]): string {
    return items.map(item => item.firstName + ' ' + item.lastName).join(', ');
  }
}
