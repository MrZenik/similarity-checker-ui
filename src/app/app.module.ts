import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatSelectModule } from "@angular/material/select";
import { MatIconModule } from "@angular/material/icon";
import { AdminPageComponent } from './components/admin/admin-page/admin-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatGridListModule } from "@angular/material/grid-list";
import { NgOptimizedImage } from "@angular/common";
import { StudentPageComponent } from './components/student/student-page/student-page.component';
import { MatDialogModule } from "@angular/material/dialog";
import { DirectoryListComponent } from './components/directory-list/directory-list.component';
import { CdkVirtualScrollViewport } from "@angular/cdk/scrolling";
import {
  StudentDirectoriesDialogComponent
} from './components/diaglos/student-directories-dialog/student-directories-dialog.component';
import { EnrollmentsDialogComponent } from './components/diaglos/enrollments-dialog/enrollments-dialog.component';
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { AreYouSureDialogComponent } from './components/diaglos/are-you-sure-dialog/are-you-sure-dialog.component';
import { MatSnackBarModule } from "@angular/material/snack-bar";
import {
  PlagiarismRequestDialogComponent
} from './components/diaglos/plagarism-request-dialog/plagiarism-request-dialog.component';
import { MatMenuModule } from "@angular/material/menu";
import {
  UpdateAccountDialogComponent
} from './components/diaglos/update-account-dialog/update-account-dialog.component';
import { LineBreaksToHtmlPipe } from './pipes/line-breaks-to-html.pipe';
import { TeacherSubjectsComponent } from "./components/teacher/teacher-subjects/teacher-subjects.component";
import { TeacherFilesComponent } from "./components/teacher/teacher-files/teacher-files.component";
import {
  TeacherFileUploadDialogComponent
} from "./components/diaglos/teacher-file-upload-dialog/teacher-file-upload-dialog.component";
import { SubjectComponent } from "./components/teacher/subject/subject.component";
import {
  SubjectFileUploadDialogComponent
} from "./components/diaglos/subject-file-upload-dialog/subject-file-upload-dialog.component";
import { AddSubjectDialogComponent } from "./components/diaglos/add-subject-dialog/add-subject-dialog.component";
import { DirectoryListActionsComponent } from "./components/directory-list-actions/directory-list-actions.component";
import { MatTableModule } from "@angular/material/table";
import { StudentStatisticComponent } from "./components/teacher/student-statistics/student-statistics.component";
import { MatExpansionModule } from "@angular/material/expansion";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AdminPageComponent,
    NavbarComponent,
    StudentPageComponent,
    DirectoryListComponent,
    StudentDirectoriesDialogComponent,
    EnrollmentsDialogComponent,
    AreYouSureDialogComponent,
    PlagiarismRequestDialogComponent,
    UpdateAccountDialogComponent,
    LineBreaksToHtmlPipe,
    TeacherSubjectsComponent,
    TeacherFilesComponent,
    TeacherFileUploadDialogComponent,
    SubjectComponent,
    SubjectFileUploadDialogComponent,
    AddSubjectDialogComponent,
    SubjectComponent,
    DirectoryListActionsComponent,
    StudentStatisticComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatIconModule,
    MatToolbarModule,
    MatGridListModule,
    NgOptimizedImage,
    MatDialogModule,
    CdkVirtualScrollViewport,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatMenuModule,
    MatTableModule,
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
