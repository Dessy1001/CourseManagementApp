import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { UserGradesComponent } from './user-grades.component';

import { MatTableModule } from '@angular/material/table';

import { MatDialogModule } from '@angular/material/dialog';

import { MatIconModule } from '@angular/material/icon';

import { MatInputModule } from '@angular/material/input';

import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    UserGradesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatCardModule
  ],
  exports: [UserGradesComponent]
})

export class UserGradesModule { }
