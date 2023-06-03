import { Component, OnInit } from '@angular/core';
import { Subject } from "../../../model/subject";
import { TeacherService } from "../../../service/teacher.service";
import { SessionStorageService } from "../../../security/session-storage.service";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { EnrollmentsDialogComponent } from "../../diaglos/enrollments-dialog/enrollments-dialog.component";
import { AddSubjectDialogComponent } from "../../diaglos/add-subject-dialog/add-subject-dialog.component";
import { AreYouSureDialogComponent } from "../../diaglos/are-you-sure-dialog/are-you-sure-dialog.component";
import { Directory } from "../../../model/directory";
import {
  StudentDirectoriesDialogComponent
} from "../../diaglos/student-directories-dialog/student-directories-dialog.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { FilesService } from "../../../service/files.service";
import { SubjectService } from "../../../service/subject.service";

@Component({
  selector: 'teacher-subjects',
  templateUrl: './teacher-subjects.component.html',
  styleUrls: ['./teacher-subjects.component.scss']
})
export class TeacherSubjectsComponent implements OnInit {

  public subjects: Subject[] = []

  constructor(private teacherService: TeacherService,
              private subjectService: SubjectService,
              private filesService: FilesService,
              private sessionStorageService: SessionStorageService,
              private router: Router,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.getTeacherSubjects()
  }

  public getTeacherSubjects() {
    this.teacherService.getAllTeacherSubjects().subscribe({
      next: (subjects: Subject[]) => {
        this.subjects = subjects
      }, error: err => {
        if (err.status == 401) {
          this.sessionStorageService.clear()
          this.router.navigate(["/login"])
        } else {
          this.openSnackBar("Something went wrong!")
        }
      }
    })
  }

  createNewSubject() {
    const dialogRef = this.dialog.open(AddSubjectDialogComponent, {
      width: '700px',
      minHeight: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.subjects.push(result)
        this.openSnackBar(`'${result.name}' was created successfully!`)
      }
    });
  }

  updatedSubject(subject: Subject) {
    const dialogRef = this.dialog.open(AddSubjectDialogComponent, {
      width: '700px',
      minHeight: '300px',
      data: {subject: subject}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.subjects[this.subjects.indexOf(subject)] = result
        this.openSnackBar("Subject was updated successfully!")
      }
    });
  }

  delete(subject: Subject) {
    const dialogRef = this.dialog.open(AreYouSureDialogComponent, {
      minWidth: '200px',
      minHeight: '150px',
      data: {title: ' to delete subject ' + subject.name}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.subjectService.deleteSubjectById(subject.id).subscribe({
          next: () => {
            this.getTeacherSubjects()
            this.openSnackBar("Subject was deleted successfully!")
          }, error: err => {
            if (err.status == 401) {
              this.sessionStorageService.clear()
              this.router.navigate(["/login"])
            } else {
              this.openSnackBar("Something went wrong!")
            }
          }
        })
      }
    });
  }

  public showSubjectFiles(subject: Subject) {
    this.filesService.getPartialTeacherDirectoryStructure(subject).subscribe({
      next: (resp: Directory) => {
        const dialogRef = this.dialog.open(StudentDirectoriesDialogComponent, {
          width: '1500px',
          data: {directory: resp}
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

  navigateToSubject(id: number) {
    this.router.navigate(['/subject', id]);
  }

  openSnackBar(message: string, action: string = "Ok") {
    this.snackBar.open(message, action, {duration: 5000});
  }

}
