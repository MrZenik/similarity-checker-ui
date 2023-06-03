import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { SubjectService } from "../../../service/subject.service";
import { Subject } from "../../../model/subject";
import { AddSubjectDialogComponent } from "../../diaglos/add-subject-dialog/add-subject-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { FilesSimilarPairService } from "../../../service/files-similar-pair.service";
import { StudentStatistic } from "../../../model/files-similar-pair";
import { UserDto } from "../../../model/user";
import { TeacherService } from "../../../service/teacher.service";
import { EnrollmentsDialogComponent } from "../../diaglos/enrollments-dialog/enrollments-dialog.component";
import {
  PlagiarismRequestDialogComponent
} from "../../diaglos/plagarism-request-dialog/plagiarism-request-dialog.component";
import { FilesService } from "../../../service/files.service";
import { Directory } from "../../../model/directory";
import { SessionStorageService } from "../../../security/session-storage.service";
import { AreYouSureDialogComponent } from "../../diaglos/are-you-sure-dialog/are-you-sure-dialog.component";

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {

  subject: Subject | undefined;
  studentStatistic: StudentStatistic[] = []
  enrolledStudents: UserDto[] = []
  currentStudentEmail: string = ""
  directory: Directory | undefined
  studentDirectory: Directory | undefined
  toShowFiles: boolean = false

  constructor(private route: ActivatedRoute,
              private router: Router,
              private subjectService: SubjectService,
              private teacherService: TeacherService,
              private filesService: FilesService,
              private sessionStorageService: SessionStorageService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private filesSimilarPairService: FilesSimilarPairService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id')
      if (id) {
        this.subjectService.getSubjectById(parseInt(id)).subscribe({
          next: (subject: Subject) => {
            this.subject = subject
            this.getALlEnrolledStudents()
            this.loadSubjectDirectory()
          }, error: err => {
            this.navigateHome()
          }
        })
      } else {
        this.navigateHome()
      }
    });
  }

  updatedSubject(subject: Subject) {
    const dialogRef = this.dialog.open(AddSubjectDialogComponent, {
      width: '700px',
      minHeight: '300px',
      data: {subject: subject}
    });

    dialogRef.afterClosed().subscribe(subject => {
      if (subject) {
        this.subject = subject
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
            this.router.navigate(["/home"])
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

  openPlagiarismRequestDialog() {
    const dialogRef = this.dialog.open(PlagiarismRequestDialogComponent, {
      width: '1600px',
      data: {directory: this.directory, removeRoot: false}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.openSnackBar("System processing your request", "Ok")
      }
    });
  }

  getFilesSimilarityPairForUser(event: any) {
    this.currentStudentEmail = event.value;
    this.studentDirectory = this.directory?.subdirectories?.find(dir => dir.name === event.value);
    this.filesSimilarPairService.getFilesSimilarPairs(event.value, this.subject?.id!).subscribe({
      next: (studentStatistic: StudentStatistic[]) => {
        this.studentStatistic = studentStatistic
      }
    })
  }

  openStudentsDialog(subject: Subject) {
    const dialogRef = this.dialog.open(EnrollmentsDialogComponent, {
      width: '800px',
      data: {subject: subject}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.openSnackBar("Students were enrolled!")
        this.getALlEnrolledStudents()
      }
    })
  }

  private loadSubjectDirectory() {
    this.filesService.getPartialTeacherDirectoryStructure(this.subject!).subscribe({
      next: (resp: Directory) => {
        this.directory = resp

        if (this.directory && (
          (this.directory.files?.length && this.directory.files?.length > 0) ||
          (this.directory.subdirectories?.length && this.directory.subdirectories?.length > 0)
        )) {
          this.toShowFiles = true;
        }
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

  private getALlEnrolledStudents() {
    this.teacherService.getALlEnrolledStudents(this.subject?.id!).subscribe({
      next: (users: UserDto[]) => {
        this.enrolledStudents = users;
      }, error: err => {
        this.navigateHome()
      }
    });
  }

  private navigateHome() {
    this.router.navigate(["/home"])
  }

  private openSnackBar(message: string, action: string = "Ok") {
    this.snackBar.open(message, action, {duration: 5000});
  }

}
