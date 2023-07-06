import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

import { ForgottenPasswordComponent } from './forgotten-password.component';

@NgModule({
  declarations: [
    ForgottenPasswordComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule
  ],
 exports: [ForgottenPasswordComponent]
})

export class ForgottenPasswordModule { }
