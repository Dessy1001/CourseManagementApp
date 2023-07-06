import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgSelectModule } from '@ng-select/ng-select';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DirectivesModule } from 'src/app/directives/directives.module';

import { RegisterComponent } from './register.component';

@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatProgressBarModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    NgxDropzoneModule,
    NgSelectModule
  ],
  exports: [RegisterComponent]
})

export class RegisterModule { }
