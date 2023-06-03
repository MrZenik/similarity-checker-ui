import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Subject } from "../../../model/subject";
import { FilesService } from "../../../service/files.service";
import { SessionStorageService } from "../../../security/session-storage.service";
import { Router } from "@angular/router";

@Component({
  selector: 'subject-file-upload-dialog',
  templateUrl: './subject-file-upload-dialog.component.html',
  styleUrls: ['./subject-file-upload-dialog.component.scss']
})
export class SubjectFileUploadDialogComponent {

  subject: Subject;

  selectedFile: File | undefined;
  errorMessage: string = "";

  constructor(private dialogRef: MatDialogRef<SubjectFileUploadDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any,
              private filesService: FilesService,
              private sessionStorageService: SessionStorageService,
              private router: Router,) {
    this.subject = this.data.subject;
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.selectedFile = file;
    this.errorMessage = this.selectedFile ? this.errorMessage : "";

    if (file) {
      const fileSize = file.size / 1024 / 1024; // in MB
      if (fileSize > 5) {
        this.errorMessage = 'File size exceeds the allowed limit of 5MB.';
      } else {
        this.errorMessage = "";
      }
    }
  }

  onSubmit() {
    if (this.selectedFile && !this.errorMessage) {

      this.filesService.uploadFiles([this.selectedFile], "/" + this.subject.folderName + "/", this.subject.teacherId).subscribe({
        next: () => {
          this.dialogRef.close(true);
        }, error: (err) => {
          if (err.status == 401) {
            this.sessionStorageService.clear();
            this.router.navigate(["/login"])
          } else {
            this.errorMessage = "Something went wrong!"
            this.selectedFile = undefined;
          }
        }
      })
    } else {
      this.errorMessage = 'Please select a valid file.';
    }
  }

}
