import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ChangePasswordModule } from './components/change-password/change-password.module';
import { ForgottenPasswordModule } from './components/forgotten-password/forgotten-password.module';
import { LoginModule } from './components/login/login.module';
import { NotFoundModule } from './components/not-found/not-found.module';
import { RegisterModule } from './components/register/register.module';
import { NavBarModule } from './components/nav-bar/nav-bar.module';
import { UsersModule } from './components/users/users.module';
import { CreateCourseModule } from './components/create-course/create-course.module';
import { CoursesModule } from './components/courses/courses.module';
import { CourseModulesModule } from './components/course-modules/course-modules.module';
import { CreateCourseModuleModule } from './components/create-course-module/create-course-module.module';
import { CourseModuleLecturesModule } from './components/course-module-lectures/course-module-lectures.module';
import { CreateCourseModuleLectureModule } from './components/create-course-module-lecture/create-course-module-lecture.module';
import { UserGradesModule } from './components/user-grades/users-grades.module';
import { UpdateCourseModule } from './components/update-course/update-course.module';
import { UpdateCourseModuleModule } from './components/update-course-module/update-course-module.module';
import { UpdateCourseModuleLectureModule } from './components/update-course-module-lecture/update-course-module-lecture.module';
import { UpdateUserModule } from './components/update-user/update-user.module';

import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    ChangePasswordModule,
    CoursesModule,
    CourseModulesModule,
    CreateCourseModule,
    CreateCourseModuleModule,
    CreateCourseModuleLectureModule,
    ForgottenPasswordModule,
    RegisterModule,
    LoginModule,
    NavBarModule,
    NotFoundModule,
    UpdateCourseModule,
    UpdateCourseModuleModule,
    UpdateCourseModuleLectureModule,
    UpdateUserModule,
    UsersModule,
    RouterModule,
    CourseModuleLecturesModule,
    CreateCourseModuleLectureModule,
    UserGradesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
