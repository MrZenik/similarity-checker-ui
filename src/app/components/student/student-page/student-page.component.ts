import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from "../../../security/session-storage.service";
import { StudentService } from "../../../service/student.service";
import { Router } from "@angular/router";
import { Subject } from "../../../model/subject";
import { MatDialog } from "@angular/material/dialog";
import { SubjectFileUploadDialogComponent } from "../../diaglos/subject-file-upload-dialog/subject-file-upload-dialog.component";
import { Directory } from "../../../model/directory";
import { StudentDirectoriesDialogComponent } from "../../diaglos/student-directories-dialog/student-directories-dialog.component";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'student-page',
  templateUrl: './student-page.component.html',
  styleUrls: ['./student-page.component.scss']
})
export class StudentPageComponent implements OnInit {

  public subjects: Subject[] = []
  public directory: Directory | undefined;

  constructor(private sessionStorageService: SessionStorageService,
              private router: Router,
              private studentService: StudentService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.getAllStudentSubjects()
  }

  public getAllStudentSubjects() {
    this.studentService.getAllStudentSubjects(this.sessionStorageService.getUser().id).subscribe({
      next: (subjects: Subject[]) => {
        this.subjects = subjects;
      }, error: err => {
        if (err.status == 401) {
          this.sessionStorageService.clear();
          this.router.navigate(["/login"])
        } else {
          this.openSnackBar("Something went wrong!")
        }
      }
    })
  }

  openFileUploadDialog(subject: Subject) {
    const dialogRef = this.dialog.open(SubjectFileUploadDialogComponent, {
      width: '400px',
      data: {subject: subject}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.openSnackBar("File was attached to subject successfully!")
      }
    })
  }

  public showUserDirectories(subject: Subject) {
    this.studentService.getStudentSubjectFiles(subject.folderName, subject.teacherId, subject.id).subscribe({
      next: (resp: Directory) => {
        this.directory = resp
        const dialogRef = this.dialog.open(StudentDirectoriesDialogComponent, {
          width: '1500px',
          data: {directory: this.directory}
        });
      }, error: (err) => {
        if (err.status == 401) {
          this.sessionStorageService.clear();
          this.router.navigate(["/login"])
        } else {
          this.openSnackBar("Something went wrong!")
        }
      }
    })
  }

  openSnackBar(message: string, action: string = "Ok") {
    this.snackBar.open(message, action, {duration: 5000});
  }

}
