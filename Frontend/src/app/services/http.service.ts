import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IUser } from '../models/user.model';
import { ICourse } from '../models/course.model';
import { ICourseModule } from '../models/course.module.model';
import { ICourseModuleLecture } from '../models/course-module.lecture.model';
import { IUserGrade } from '../models/user-grade.model';

interface LoginResponse {
  user: IUser;
  token: string;
}

@Injectable({
  providedIn: 'root'
})

export class HTTPService {

  constructor(
    private http: HttpClient) { }

  private authUrl = 'http://localhost:3000/api/auth';
  private courseUrl = 'http://localhost:3000/api/courses';
  private userUrl = 'http://localhost:3000/api/users';

  private httpOptionsText = {
    headers: new HttpHeaders({
      'Content-Type': 'Application/JSON',
      observe: 'response',
      responseType: 'text',
      Authorization: sessionStorage.getItem('token') || ''
    })
  };

  private httpOptionsJSON = {
    headers: new HttpHeaders({
      'Content-Type': 'Application/JSON',
      observe: 'response',
      responseType: 'json',
      Authorization: sessionStorage.getItem('token') || ''
    })
  };

  public registerNewUser(data: FormData): Observable<IUser> {
    const url = this.authUrl + '/register';
    const httpOptions = {
      headers: new HttpHeaders({
        observe: 'response',
        responseType: 'json',
        Authorization: sessionStorage.getItem('token') || ''
      })
    };
    return this.http.post<IUser>(url, data, httpOptions);
  }

  public loginUser(data: {email: string, password: string}): Observable<LoginResponse> {
    const url = this.authUrl + '/login';
    return this.http.post<LoginResponse>(url, data, this.httpOptionsText);
  }

  public resetPassword(data: {newPassword: string}): Observable<string> {
    const url = this.authUrl + '/password/reset';
    return this.http.post<string>(url, data, this.httpOptionsText);
  }

  public forgottenPassword(data: {email: string}): Observable<string> {
    const url = this.authUrl + '/password/forgotten';
    return this.http.post<string>(url, data, this.httpOptionsText);
  }

  public changePassword(data: {currentPassword: string, newPassword: string, token: string}): Observable<string> {
    const url = this.authUrl + '/password/change';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'Application/JSON',
        observe: 'response',
        responseType: 'text',
        Authorization: data.token
      })
    };
    return this.http.post<string>(url, data, httpOptions);
  }

  public getUsers(): Observable<IUser[]> {
    const url = this.userUrl;
    return this.http.get<IUser[]>(url, this.httpOptionsJSON);
  }

  public createUser(data: IUser): Observable<IUser> {
    const url = this.userUrl;
    return this.http.post<IUser>(url, data, this.httpOptionsJSON);
  }

  public updateUser(userId: string, data: FormData): Observable<any> {
    const url = `${this.userUrl}/${userId}`;
    const httpOptions = {
      headers: new HttpHeaders({
        observe: 'response',
        responseType: 'json',
        Authorization: sessionStorage.getItem('token') || ''
      })
    };
    return this.http.post<any>(url, data, httpOptions);
  }

  public getUser(userId: string): Observable<IUser> {
    const url = `${this.userUrl}/${userId}`;
    return this.http.get<IUser>(url, this.httpOptionsJSON);
  }

  public deleteUser(data: IUser): Observable<string> {
    const url = this.userUrl + '/' + data.id;
    return this.http.delete<string>(url, this.httpOptionsText);
  }

  public getCourses(): Observable<ICourse[]> {
    const url = this.courseUrl;
    return this.http.get<ICourse[]>(url, this.httpOptionsJSON);
  }

  public getCourse(courseId: string): Observable<ICourse> {
    const url = this.courseUrl + '/' + courseId;
    return this.http.get<ICourse>(url, this.httpOptionsJSON);
  }

  public getUsersCourses(userId: string): Observable< ICourse[]> {
    const url = this.courseUrl + '/' + userId + '/courses';
    return this.http.get<ICourse[]>(url, this.httpOptionsJSON);
  }

  public createCourse(data: ICourse): Observable<ICourse> {
    const url = this.courseUrl;
    return this.http.post<ICourse>(url, data, this.httpOptionsJSON);
  }

  public updateCourse(courseId: string, body: ICourse): Observable<ICourse> {
    const url = this.courseUrl + '/' + courseId;
    return this.http.post<ICourse>(url, body, this.httpOptionsJSON);
  }

  public deleteCourse(data: ICourse): Observable<string> {
    const url = this.courseUrl + '/' + data.id;
    return this.http.delete<string>(url, this.httpOptionsText);
  }

  public getCourseModules(courseId: string): Observable<ICourseModule[]> {
    const url = this.courseUrl + '/' + courseId + '/modules';
    return this.http.get<ICourseModule[]>(url, this.httpOptionsJSON);
  }

  public createCourseModule(data: ICourseModule): Observable<ICourseModule> {
    const url = this.courseUrl + '/create-module';
    return this.http.post<ICourseModule>(url, data, this.httpOptionsJSON);
  }

  public updateCourseModule(moduleId: string, body: ICourseModule): Observable<ICourseModule> {
    const url = this.courseUrl + '/modules/' + moduleId;
    return this.http.post<ICourseModule>(url, body, this.httpOptionsJSON);
  }

  public getModuleById(moduleId: string): Observable<ICourseModule> {
    const url = this.courseUrl + '/modules/' + moduleId;
    return this.http.get<ICourseModule>(url, this.httpOptionsJSON);
  }

  public deleteCourseModule(data: ICourseModule): Observable<string> {
    const url = this.courseUrl + '/modules/' + data.id;
    return this.http.delete<string>(url, this.httpOptionsText);
  }

  public getCourseModuleLectures(moduleId: string): Observable<ICourseModuleLecture[]> {
    const url = this.courseUrl + '/' + moduleId + '/lectures';
    return this.http.get<ICourseModuleLecture[]>(url, this.httpOptionsJSON);
  }

  public getLecture(lectureId: string): Observable<ICourseModuleLecture> {
    console.log(lectureId)
    const url = this.courseUrl + '/lectures/' + lectureId;
    return this.http.get<ICourseModuleLecture>(url, this.httpOptionsJSON);
  }

  public createCourseModuleLecture(data: ICourseModuleLecture): Observable<ICourseModuleLecture> {
    const url = this.courseUrl + '/create-lecture';
    return this.http.post<ICourseModuleLecture>(url, data, this.httpOptionsJSON);
  }

  public updateCourseModuleLecture(lectureId: string, body: ICourseModuleLecture): Observable<ICourseModuleLecture> {
    const url = this.courseUrl + '/lectures/' + lectureId;
    return this.http.post<ICourseModuleLecture>(url, body, this.httpOptionsJSON);
  }

  public getLectureById(lectureId: string): Observable<ICourseModuleLecture> {
    const url = this.courseUrl + '/lectures/' + lectureId;
    return this.http.get<ICourseModuleLecture>(url, this.httpOptionsJSON);
  }

  public getModuleGrade(moduleId: string, userId: string): Observable<number> {
    const url = this.courseUrl + '/grade/' + moduleId + '/' + userId;
    return this.http.get<number>(url, this.httpOptionsJSON);
  }

  public deleteCourseModuleLecture(data: ICourseModuleLecture): Observable<string> {
    const url = this.courseUrl + '/lectures/' + data.id;
    return this.http.delete<string>(url, this.httpOptionsText);
  }

  public getUsersFromCourse(courseId: string): Observable<IUser[]> {
    const url = this.courseUrl + '/' + courseId + '/users';
    return this.http.get<IUser[]>(url, this.httpOptionsJSON);
  }

  public postLectureGrades(data: {lectureId: string , userGrades:{ userId: string; grade: number; }[]}): Observable<IUserGrade[]> {
    const url = this.courseUrl + '/' + data.lectureId + '/add-user-grades';
    return this.http.post<IUserGrade[]>(url, data, this.httpOptionsJSON);
  }
}
