import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from 'src/app/app-routing.module';

import { CourseModuleLecturesComponent } from './course-module-lectures.component';

import { MatTableModule } from '@angular/material/table';

import { MatDialogModule } from '@angular/material/dialog';

import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    CourseModuleLecturesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatTableModule,
    MatDialogModule,
    MatIconModule
  ],
  exports: [CourseModuleLecturesComponent]
})

export class CourseModuleLecturesModule { }
