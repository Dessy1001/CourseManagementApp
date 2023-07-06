import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { CreateCourseComponent } from '../create-course/create-course.component';

import { AuthService } from 'src/app/services/auth.service';

import { IUser, UserRole } from 'src/app/models/user.model';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent implements OnInit {
  public loggedInUser!: IUser | null;
  public userRole!: UserRole;

  constructor(
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog) {
  }

  public ngOnInit(): void {
    this.authService.getUser().subscribe((user: IUser) => {
      if (user && Object.keys(user).length > 0) {
        this.loggedInUser = user;
        if (user.role) {
          this.userRole = user.role
          console.log(this.userRole);
        }
      } else {
        this.loggedInUser = null;
      }
    });
  }

  public openLogin(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      panelClass: 'my-class',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  public openCreateUser(): void {
    if (this.loggedInUser?.role === 1) {
      const dialogRef = this.dialog.open(RegisterComponent, {
        width: '500px',
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    }
  }

  public openChangePassword(): void {
    const dialogRef = this.dialog.open(ChangePasswordComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  public openCreateCourse(): void {
    if (this.loggedInUser?.role === UserRole.Admin) {
      const dialogRef = this.dialog.open(CreateCourseComponent, {});

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    }
  }

  public logout(): void {
    this.authService.setUser({} as IUser);
    sessionStorage.clear;
    this.userRole = 0;
    this.router.navigate(['/']);
  }
}
