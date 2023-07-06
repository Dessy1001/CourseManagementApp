import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ChangePasswordComponent } from './change-password.component';

@NgModule({
  declarations: [
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule
  ],
 exports: [ChangePasswordComponent]
})

export class ChangePasswordModule { }
