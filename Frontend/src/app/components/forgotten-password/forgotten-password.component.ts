import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { HTTPService } from 'src/app/services/http.service';
import { passwordMatchingValidatiorChangePsw } from 'src/app/validators/confirmPassword.validator';

@Component({
  selector: 'app-forgotten-password',
  templateUrl: './forgotten-password.component.html',
  styleUrls: ['./forgotten-password.component.css']
})

export class ForgottenPasswordComponent implements OnInit {

  constructor(
    private httpService: HTTPService,
    private activatedRoute: ActivatedRoute) {
    this.createSendEmailForm();
    this.createResetPasswordForm();
  }

  public submitted!: boolean;
  public statusMessage!: string;
  public hasQueryParams!: boolean;
  public sendEmailFormGroup!: FormGroup;
  public resePasswordFormGroup!: FormGroup;

  public ngOnInit(): void {
    if (this.activatedRoute.snapshot.queryParams['token']) {
      this.hasQueryParams = true;
    }
  }

  private createSendEmailForm(): void {
    this.sendEmailFormGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(/^[a-z0-9.]{1,64}@[a-z0-9.]{1,64}$/i)])
    });
  }

  private createResetPasswordForm(): void {
    this.resePasswordFormGroup = new FormGroup({
      newPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)]),
      confirmPassword: new FormControl('', [Validators.required])
    }, { validators: passwordMatchingValidatiorChangePsw });
  }

  public onSubmitSendLink(): void {
    if (this.sendEmailFormGroup.valid) {
      const body: any = {
        'email': this.sendEmailFormGroup.controls['email'].value,
      };

      this.httpService.forgottenPassword(body).subscribe(
        (data: string) => {
          this.sendEmailFormGroup.reset();
          this.statusMessage = 'Reset link sent to e-mail!'
        },
        (error: any) => {
          this.sendEmailFormGroup.reset();
          this.statusMessage = 'No such user found!'
        })

    } else {
      this.sendEmailFormGroup.markAllAsTouched();
    }
  }

  public onSubmitResetPassword(): void {
    this.submitted = true;

    if (this.resePasswordFormGroup.valid) {
      let token = this.activatedRoute.snapshot.queryParams['token'];

      if (token) {
        const body: any = {
          'newPassword': this.resePasswordFormGroup.controls['newPassword'].value,
          token
        };

        this.httpService.resetPassword(body).subscribe(
          (data: string) => {
            this.resePasswordFormGroup.reset();
            this.statusMessage = 'Password changed!';
          },
          (error: any) => {
            this.statusMessage = 'Password not changed!';
          })
      }
    } else {
      this.resePasswordFormGroup.markAllAsTouched();
    }
  }
}
