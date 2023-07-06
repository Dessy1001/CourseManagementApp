import { Component } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

import { MatDialogRef } from '@angular/material/dialog';

import { Router } from '@angular/router';

import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';

import { HTTPService } from 'src/app/services/http.service';

import { passwordMatchingValidatiorRegister } from 'src/app/validators/confirmPassword.validator';

import { IUser, UserRole } from 'src/app/models/user.model';
import { ICourse } from 'src/app/models/course.model';

interface ILanguage {
  language: string;
  level: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {

  constructor(
    private matDialogRef: MatDialogRef<RegisterComponent>,
    private matSnackBar: MatSnackBar,
    private httpService: HTTPService,
    private router: Router,
    private formBuilder: FormBuilder) {
    this.createForm();
  }

  public formGroup!: FormGroup;
  public languagesList!: FormArray;
  public statusMessage!: string;
  public hide = true;
  public hideRP = true;
  public files: File[] = [];
  public submit = false;
  public courses!: ICourse[];
  public selectedCourses: string[] = [];
  public listOfLanguages: ILanguage[] = [];
  public loading: boolean = true;
  public selectedRole!: string;

  public ngOnInit(): void {
    this.httpService.getCourses().subscribe(
      (data: ICourse[]) => {
        this.courses = data;
        this.loading = false;
      },
      (error: any) => {
        this.loading = false;
      });
  }

  private createForm(): void {
    this.formGroup = new FormGroup({
      role: new FormControl(''),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/gm)
      ]),
      confirmPassword: new FormControl('', [
        Validators.required
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
        Validators.required,
        Validators.min(1),
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
      courseIds: new FormControl(''),
      languages: this.formBuilder.array([this.createLanguage()])
    }, { validators: passwordMatchingValidatiorRegister });

    this.languagesList = this.formGroup.get('languages') as FormArray;
  }

  public createLanguage(): FormGroup {
    return this.formBuilder.group({
      language: ['', Validators.required],
      level: ['', Validators.required]
    });
  }

  // add language form group
  public addLanguage(): void {
    this.languagesList.push(this.createLanguage());
  }

  // remove language from group
  public removeLanguage(index: number): void {
    this.languagesList.removeAt(index);
  }

  public get languagesFormGroup(): FormArray {
    return this.formGroup.get('languages') as FormArray;
  }

  public closeDialog(): void {
    this.matDialogRef.close();
  }

  public openSnackBar(): void {
    if (this.formGroup.valid && this.submit) {
      this.matSnackBar.open('User created successfully!', '', {
        duration: 3000
      });
    }
  }

  public onSelect(event: any): void {
    if (this.files.length < 2) {
      this.files.push(...event.addedFiles);
    }
    else {
      this.statusMessage = 'You can only upload 2 files!'
    }
  }

  public onRemove(event: any): void {
    this.files.splice(this.files.indexOf(event), 1);
  }

  public onSubmit(): void {
    if (this.formGroup.valid) {
      const formData = new FormData();
      formData.append('email', this.formGroup.controls['email'].value);
      formData.append('password', this.formGroup.controls['password'].value);
      formData.append('firstName', this.formGroup.controls['firstName'].value);
      formData.append('lastName', this.formGroup.controls['lastName'].value);
      formData.append('age', this.formGroup.controls['age'].value);
      formData.append('city', this.formGroup.controls['city'].value);
      formData.append('country', this.formGroup.controls['country'].value);
      formData.append('phone', this.formGroup.controls['phone'].value);
      formData.append('repository', this.formGroup.controls['repository'].value);

      if (this.files.length === 2) {
        const fileOne = this.files[0];
        const fileTwo = this.files[1];
        const fileOneName = fileOne.name;
        const fileOneExtension = fileOneName.substring(fileOneName.lastIndexOf('.') + 1);
        const fileTwoName = fileTwo.name;
        const fileTwoExtension = fileTwoName.substring(fileTwoName.lastIndexOf('.') + 1);

        if (fileOneExtension === 'png' && fileTwoExtension === 'pdf') {
          formData.append('picture', this.files[0]);
          formData.append('resume', this.files[1]);
        } else if (fileOneExtension === 'pdf' && fileTwoExtension === 'png') {
          formData.append('picture', this.files[1]);
          formData.append('resume', this.files[0]);
        } else {
          this.statusMessage = 'Files need to be PDF and PNG format!'
        }
      } else {
        this.statusMessage = 'Please upload needed files!'
      }

      const languages = this.languagesList.value.map((language: ILanguage) => ({
        language: language.language,
        level: language.level
      }));

      languages.forEach((lang: ILanguage, index: number) => {
        formData.append(`languages[${index}][language]`, lang.language);
        formData.append(`languages[${index}][level]`, lang.level);
      });

      if (this.selectedRole === 'admin') {
        formData.append('role', UserRole.Admin.toString())
      } else if (this.selectedRole === 'user') {
        formData.append('role', UserRole.End_User.toString())
      }

      this.selectedCourses.forEach(courseId => {
        formData.append('courseIds', courseId);
      });

      this.httpService.registerNewUser(formData).subscribe(
        (data: IUser) => {
          this.openSnackBar();
          this.matDialogRef.close();
          this.router.navigateByUrl('/').then(() => {
            this.router.navigate(['/users']);
          });
        },
        (error: any) => {
          if (!this.statusMessage) {
            this.statusMessage = 'User already exists!'
          }
        })
    } else {
      this.formGroup.markAllAsTouched();
    }
    this.submit = true;
  }
}
