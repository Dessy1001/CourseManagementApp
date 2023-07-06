import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from 'src/app/app-routing.module';

import { CoursesComponent } from './courses.component';

import { MatTableModule } from '@angular/material/table';

import { MatDialogModule } from '@angular/material/dialog';

import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    CoursesComponent
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
  exports: [CoursesComponent]
})

export class CoursesModule { }
