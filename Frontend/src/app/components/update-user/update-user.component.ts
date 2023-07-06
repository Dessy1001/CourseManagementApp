import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HTTPService } from './../../services/http.service';

import { NgxDropzoneChangeEvent } from 'ngx-dropzone/lib/ngx-dropzone/ngx-dropzone.component';

import { IUser, UserRole } from 'src/app/models/user.model';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})

export class UpdateUserComponent implements OnInit {

  constructor(
    private httpService: HTTPService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.createForm();
  }

  public formGroup!: FormGroup;
  public statusMessage!: string;
  public userId!: string;
  public courses!: any;
  public loading: boolean = true;
  public files: File[] = [];
  public selectedRole!: string;

  public ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];
    this.httpService.getCourses().subscribe(
      (data: any) => {
        this.courses = data;
        this.loading = false;
      },
      (error: any) => {
        this.loading = false;
      }
    );
    this.loadUser();
  }

  private createForm(): void {
    this.formGroup = new FormGroup({
      role: new FormControl('', [
        Validators.required
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)
      ]),
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(2)
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(2)
      ]),
      age: new FormControl('', [
        Validators.required, Validators.min(1),
        Validators.max(99)
      ]),
      city: new FormControl('', [
        Validators.required,
        Validators.minLength(2)
      ]),
      country: new FormControl('', [
        Validators.required,
        Validators.minLength(2)
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10)
      ]),
      repository: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern(/^(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/)
      ]),
      picture: new FormControl(''),
      resume: new FormControl(''),
      courseIds: new FormControl('')
    });
  }

  private loadUser(): void {
    this.httpService.getUser(this.userId).subscribe(
      (user: IUser) => {
        const role = user.role === UserRole.Admin ? 'admin' : 'user';

        this.formGroup.patchValue({
          role: role,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          age: user.age,
          city: user.city,
          country: user.country,
          phone: user.phone,
          repository: user.repository,
          picture: user.picture,
          resume: user.resume,
          courseIds: user.courseIds
        });
      },
      (error: any) => {
        this.statusMessage = error.message;
      }
    );
  }

  public onSelect(event: NgxDropzoneChangeEvent): void {
    if (this.files.length < 2) {
      this.files.push(...event.addedFiles);
    } else {
      this.statusMessage = 'You can only upload 2 files!';
    }
  }

  public onRemove(event: File): void {
    this.files.splice(this.files.indexOf(event), 1);
  }

  public onSubmit(): void {
    if (this.formGroup.valid) {
      const formData = new FormData();
      formData.append('firstName', this.formGroup.controls['firstName'].value);
      formData.append('lastName', this.formGroup.controls['lastName'].value);
      formData.append('age', this.formGroup.controls['age'].value);
      formData.append('city', this.formGroup.controls['city'].value);
      formData.append('country', this.formGroup.controls['country'].value);
      formData.append('phone', this.formGroup.controls['phone'].value);
      formData.append('repository', this.formGroup.controls['repository'].value);
      formData.append('email', this.formGroup.controls['email'].value);
      formData.append('courseIds', this.formGroup.controls['courseIds'].value)

      if (this.files.length === 2) {
        const fileOne = this.files[0];
        const fileTwo = this.files[1];
        const fileOneName = fileOne.name;
        const fileOneExtension = fileOneName.substr(fileOneName.lastIndexOf('.') + 1);
        const fileTwoName = fileTwo.name;
        const fileTwoExtension = fileTwoName.substr(fileTwoName.lastIndexOf('.') + 1);

        if (fileOneExtension === 'png' && fileTwoExtension === 'pdf') {
          formData.append('picture', this.files[0]);
          formData.append('resume', this.files[1]);
        } else if (fileOneExtension === 'pdf' && fileTwoExtension === 'png') {
          formData.append('picture', this.files[1]);
          formData.append('resume', this.files[0]);
        } else {
          this.statusMessage = 'Files need to be PDF and PNG format!'
        }
      } else if (this.files.length === 1) {
        this.statusMessage = 'You need to upload both files in order to update!'
      }

      if (this.formGroup.controls['role'].value === 'admin') {
        formData.append('role', UserRole.Admin.toString())
      } else if (this.formGroup.controls['role'].value === 'user') {
        formData.append('role', UserRole.End_User.toString())
      }

      this.httpService.updateUser(this.userId, formData).subscribe(
        (data: IUser) => {
          this.router.navigateByUrl('/').then(() => {
            this.router.navigate(['/users']);
          });
        },
        (error: any) => {
          if (!this.statusMessage) {
            this.statusMessage = 'Failed to update user!';
          }
        }
      );

    } else {
      this.formGroup.markAllAsTouched();
    }
  }
}
