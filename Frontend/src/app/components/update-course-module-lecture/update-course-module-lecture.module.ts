import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgSelectModule } from '@ng-select/ng-select';

import { DirectivesModule } from 'src/app/directives/directives.module';

import { UpdateCourseModuleLectureComponent } from './update-course-module-lecture.component';

@NgModule({
  declarations: [UpdateCourseModuleLectureComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatButtonModule,
    NgSelectModule,
    DirectivesModule
  ],
  exports: [UpdateCourseModuleLectureComponent]
})

export class UpdateCourseModuleLectureModule { }
