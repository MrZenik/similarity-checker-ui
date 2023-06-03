import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { AuthGuard } from "./security/auth-guard";
import { HomeComponent } from "./components/home/home.component";
import { SubjectComponent } from "./components/teacher/subject/subject.component";
import { TeacherGuard } from "./security/teacher-guard";
import { TeacherFilesComponent } from "./components/teacher/teacher-files/teacher-files.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'files', component: TeacherFilesComponent, canActivate: [TeacherGuard]},
  {path: 'subject/:id', component: SubjectComponent, canActivate: [TeacherGuard]},
  {path: '**', redirectTo: "/home"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
