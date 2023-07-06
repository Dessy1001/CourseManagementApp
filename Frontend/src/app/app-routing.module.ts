import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgottenPasswordComponent } from './components/forgotten-password/forgotten-password.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/users/users.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { CreateCourseComponent } from './components/create-course/create-course.component';
import { CoursesComponent } from './components/courses/courses.component';
import { UpdateCourseComponent } from './components/update-course/update-course.component';
import { CreateCourseModuleComponent } from './components/create-course-module/create-course-module.component';
import { CourseModulesComponent } from './components/course-modules/course-modules.component';
import { UpdateCourseModuleComponent } from './components/update-course-module/update-course-module.component';
import { CreateCourseModuleLectureComponent } from './components/create-course-module-lecture/create-course-module-lecture.component';
import { CourseModuleLecturesComponent } from './components/course-module-lectures/course-module-lectures.component';
import { UpdateCourseModuleLectureComponent } from './components/update-course-module-lecture/update-course-module-lecture.component';
import { UserGradesComponent } from './components/user-grades/user-grades.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

import { AuthGuard } from './guards/auth.guard';

import { UserRole } from './models/user.model';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'user/create', component: RegisterComponent, canActivate: [AuthGuard], data: { roles: [UserRole.Admin] }},
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard], data: { roles: [UserRole.Admin] } },
  { path: 'user/:id/update', component: UpdateUserComponent, canActivate: [AuthGuard], data: { roles: [UserRole.Admin] } },
  { path: 'courses/create-course', component: CreateCourseComponent, canActivate: [AuthGuard], data: { roles: [UserRole.Admin] } },
  { path: 'courses', component: CoursesComponent },
  { path: 'reset', component: ForgottenPasswordComponent },
  { path: 'courses/:id/update', component: UpdateCourseComponent, canActivate: [AuthGuard], data: { roles: [UserRole.Admin] } },
  { path: 'courses/:courseId/modules/create-course-module', component: CreateCourseModuleComponent, canActivate: [AuthGuard], data: { roles: [UserRole.Admin] } },
  { path: 'courses/:courseId/modules', component: CourseModulesComponent },
  { path: 'courses/:courseId/modules/:moduleId/update', component: UpdateCourseModuleComponent, canActivate: [AuthGuard], data: { roles: [UserRole.Admin] }},
  { path: 'courses/:courseId/modules/:moduleId/lectures/create-lecture', component: CreateCourseModuleLectureComponent, canActivate: [AuthGuard], data: { roles: [UserRole.Admin] } },
  { path: 'courses/:courseId/modules/:moduleId/lectures', component: CourseModuleLecturesComponent },
  { path: 'courses/:courseId/modules/:moduleId/lectures/:lectureId/user-grades', component: UserGradesComponent, canActivate: [AuthGuard], data: { roles: [UserRole.Admin] } },
  { path: 'courses/:courseId/modules/:moduleId/lectures/:lectureId/update', component: UpdateCourseModuleLectureComponent, canActivate: [AuthGuard], data: { roles: [UserRole.Admin] } },
  { path: '**', component: NotFoundComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
