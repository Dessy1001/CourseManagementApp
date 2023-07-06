import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DirectivesModule } from 'src/app/directives/directives.module';

import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { NgSelectModule } from '@ng-select/ng-select';

import { CreateCourseModuleComponent } from './create-course-module.component';

@NgModule({
  declarations: [
    CreateCourseModuleComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DirectivesModule,
    MatIconModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatButtonModule,
    NgSelectModule,
    DirectivesModule
  ],
 exports: [CreateCourseModuleComponent]
})

export class CreateCourseModuleModule { }
