import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<IUser> = new BehaviorSubject<IUser>({} as IUser);

  public getUser(): Observable<IUser> {
    return this.userSubject.asObservable();
  }

  public userValue(): IUser {
    return this.userSubject.value;
  }

  public setUser(user: IUser): void {
    this.userSubject.next(user);
  }
}
