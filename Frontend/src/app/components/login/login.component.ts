import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { MatDialogRef, MatDialog } from '@angular/material/dialog';

import { HTTPService } from 'src/app/services/http.service';
import { AuthService } from 'src/app/services/auth.service';
import { IUser } from 'src/app/models/user.model';
import { ForgottenPasswordComponent } from '../forgotten-password/forgotten-password.component';

interface LoginResponse {
  user: IUser;
  token: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  constructor(
    private httpService: HTTPService,
    private router: Router,
    private authService: AuthService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<LoginComponent>
  ) {
    this.createForm();
  }

  public formGroup!: FormGroup;
  public statusMessage!: string;
  public hide = true;

  private createForm(): void {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(/^[a-z0-9.]{1,64}@[a-z0-9.]{1,64}$/i)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])//, Validators.pattern(/^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{6,}$/gm)]//)
    })
  }

  public onSubmit(): void {
    if (this.formGroup.valid) {
      const body: any = {
        'email': this.formGroup.controls['email'].value,
        'password': this.formGroup.controls['password'].value,
      };

      this.httpService.loginUser(body).subscribe(
        (data: LoginResponse) => {
          this.authService.setUser(data.user);
          sessionStorage.setItem('token', data.token);
          this.dialogRef.close();
          this.router.navigate(['/']);
        },
        (error: any) => {
          this.statusMessage = 'Incorrect username or password!'
        })

    } else {
      this.formGroup.markAllAsTouched();
    }
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }

  public onForgottenPasswordClick(): void {
    this.dialogRef.close();
    const dialogRef = this.dialog.open(ForgottenPasswordComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
