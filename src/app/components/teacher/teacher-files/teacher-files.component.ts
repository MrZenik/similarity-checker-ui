import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from "../../../security/session-storage.service";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { Directory } from "../../../model/directory";
import {
  TeacherFileUploadDialogComponent
} from "../../diaglos/teacher-file-upload-dialog/teacher-file-upload-dialog.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import {
  PlagiarismRequestDialogComponent
} from "../../diaglos/plagarism-request-dialog/plagiarism-request-dialog.component";
import { FilesService } from "../../../service/files.service";

@Component({
  selector: 'teacher-files',
  templateUrl: './teacher-files.component.html',
  styleUrls: ['./teacher-files.component.scss']
})
export class TeacherFilesComponent implements OnInit {

  directory: Directory | undefined

  constructor(private filesService: FilesService,
              private sessionStorageService: SessionStorageService,
              private router: Router,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.getAllFiles()
  }

  public getAllFiles() {
    this.filesService.getAllTeacherDirectoryStructure().subscribe({
      next: (resp: Directory) => {
        this.directory = resp
      }, error: (err) => {
        if (err.status == 401) {
          this.sessionStorageService.clear();
          this.router.navigate(["/login"])
        } else {
          this.openSnackBar("Something went wrong!", "Ok")
        }
      }
    })
  }

  openUploadDialog() {
    const dialogRef = this.dialog.open(TeacherFileUploadDialogComponent, {
      width: '700px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllFiles()
        this.openSnackBar("File uploaded!", "Ok")
      }
    });
  }

  openPlagiarismRequestDialog() {
    const dialogRef = this.dialog.open(PlagiarismRequestDialogComponent, {
      width: '1600px',
      data: {directory: this.directory}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.openSnackBar("System processing your request", "Ok")
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {duration: 5000});
  }

}
