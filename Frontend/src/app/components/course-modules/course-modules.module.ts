import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from 'src/app/app-routing.module';

import { CourseModulesComponent } from './course-modules.component';

import { MatTableModule } from '@angular/material/table';

import { MatDialogModule } from '@angular/material/dialog';

import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    CourseModulesComponent
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
  exports: [CourseModulesComponent]
})

export class CourseModulesModule { }
