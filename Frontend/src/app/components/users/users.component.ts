import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

import { Buffer } from 'buffer';

import { saveAs } from 'file-saver';

import { RegisterComponent } from '../register/register.component';

import { HTTPService } from 'src/app/services/http.service';
import { AuthService } from 'src/app/services/auth.service';

import { IUser } from 'src/app/models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {
  constructor(
    private httpService: HTTPService,
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthService
    ) { }

  public displayedColumns: string[] = ['position', 'picture', 'email', 'firstName', 'lastName', 'phone', 'resume', 'update', 'remove'];
  public loggedInUser!: IUser | null;
  public users!: IUser[];
  public user = this.authService.userValue();
  public loading: boolean = true;
  public imageData!: string;

  public ngOnInit(): void {
    this.httpService.getUsers().subscribe(
      (data: IUser[]) => {
        this.users = data;
        for (let user of this.users) {
          const base64String = Buffer.from(user.picture).toString('base64');
          const imageUrl = `data:image/png;base64, ${base64String}`;
          user.picture = imageUrl;
        }
        this.loading = false;
      },
      (error: Error) => {
        this.loading = false;
    });
  }

  public updateUser(user: IUser): void {
    this.router.navigate(['/user', user.id, 'update']);
  }

  public openCreateUser(): void {
    const dialogRef = this.dialog.open(RegisterComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  public deleteUser(user: IUser): void {
    
    this.httpService.deleteUser(user).subscribe(
      (data: string) => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/users']);
        });
      },
      (error: Error) => {
        alert('Could not delete user!')
    });
  }

  public downloadResume(user: IUser): void {
    const fileBlob = new Blob([Buffer.from(user.resume)], { type: 'application/octet-stream' });
    saveAs(fileBlob, user.firstName + user.lastName + 'sResume.pdf');
  }
}
