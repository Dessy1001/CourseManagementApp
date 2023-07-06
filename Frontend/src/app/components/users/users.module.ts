import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { UsersComponent } from './users.component';

import { MatTableModule } from '@angular/material/table';

import { MatDialogModule } from '@angular/material/dialog';

import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatDialogModule,
    MatIconModule
  ],
  exports: [UsersComponent]
})

export class UsersModule { }
