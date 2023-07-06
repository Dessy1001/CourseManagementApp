import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordMatchingValidatiorChangePsw: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const newPassword = control.get('newPassword');
  const confirmPassword = control.get('confirmPassword');

  return newPassword?.value === confirmPassword?.value ? null : { notmatched: true };
};


export const passwordMatchingValidatiorRegister: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  return password?.value === confirmPassword?.value ? null : { notmatched: true };
};
