import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FilesService } from "../../../service/files.service";
import { SessionStorageService } from "../../../security/session-storage.service";
import { Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-teacher-file-upload-dialog',
  templateUrl: './teacher-file-upload-dialog.component.html',
  styleUrls: ['./teacher-file-upload-dialog.component.scss']
})
export class TeacherFileUploadDialogComponent {

  selectedFile: File | undefined;
  errorMessage: string = "";
  userFolderName: string = this.sessionStorageService.getUser().mainDirectoryPath
  pathForm: FormGroup = new FormGroup({
    path: new FormControl("", [Validators.pattern("^[a-zA-Z0-9_]+(\\/[a-zA-Z0-9_]+)*\\/$")])
  })

  constructor(private dialogRef: MatDialogRef<TeacherFileUploadDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any,
              private filesService: FilesService,
              private sessionStorageService: SessionStorageService,
              private router: Router) {
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
    const path = this.pathForm.get('path')?.value ? this.pathForm.get('path')?.value : "/";

    if (this.selectedFile && !this.errorMessage) {
      this.filesService.uploadFiles([this.selectedFile], path, this.sessionStorageService.getUser().id).subscribe({
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
