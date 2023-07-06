import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { IUser } from 'src/app/models/user.model';

import { AuthService } from 'src/app/services/auth.service';
import { HTTPService } from 'src/app/services/http.service';

import { passwordMatchingValidatiorChangePsw } from 'src/app/validators/confirmPassword.validator';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})

export class ChangePasswordComponent {

  constructor(
    private httpService: HTTPService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<ChangePasswordComponent>,
    private matSnackBar: MatSnackBar,
    private authService: AuthService) {
    this.createForm();
  }

  public formGroup!: FormGroup;
  public submitted = false;
  public loggedInUser!: IUser | null;
  public statusMessage!: string;
  public hideCP = true;
  public hideNP = true;
  public hideRP = true;
  private submit = false;

  private createForm(): void {
    this.formGroup = new FormGroup({
      currentPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)]),
      confirmPassword: new FormControl('', [Validators.required])
    }, { validators: passwordMatchingValidatiorChangePsw });
  }
  
  public closeDialog(): void {
      this.dialogRef.close();
  }
  
  public openSnackBar(): void {
    if (this.formGroup.valid && this.submit) {
      this.matSnackBar.open('Password changed successfully!',  '', {
        duration: 3000
      });
    }
  }

  public onSubmit(): void {
    this.submitted = true;
    
    if (this.formGroup.valid) {
      this.authService.getUser().subscribe((user: IUser) => {
        if (user && Object.keys(user).length > 0) {
          this.loggedInUser = user;
        } else {
          this.loggedInUser = null;
        }
      });

      if (this.loggedInUser) {
        let token = sessionStorage.getItem('token');
        const body: any = {
          'currentPassword': this.formGroup.controls['currentPassword'].value,
          'newPassword': this.formGroup.controls['newPassword'].value,
          token
        };

        this.httpService.changePassword(body).subscribe(
          (data: string) => {
            this.openSnackBar();
            this.formGroup.reset();
            this.statusMessage = 'Password changed!';        
            this.closeDialog();           
          },
          (error: any) => {
            this.statusMessage = 'Incorrect Password!';
          })
      }
    } else {
      this.formGroup.markAllAsTouched();
    }
    this.submit = true;
  }
}
