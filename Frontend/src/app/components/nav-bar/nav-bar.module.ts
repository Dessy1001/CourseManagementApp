import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule} from '@angular/material/dialog';

import { AppRoutingModule } from 'src/app/app-routing.module';

import { NavBarComponent } from './nav-bar.component';

@NgModule({
  declarations: [
    NavBarComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatDialogModule
  ],
  exports: [
    NavBarComponent
  ]
})

export class NavBarModule { }
