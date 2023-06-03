import { Component, Inject } from '@angular/core';
import { Directory, getDirectoryPaths } from "../../../model/directory";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CheckRequest } from "../../../model/plagiarsim-request";
import { TeacherService } from "../../../service/teacher.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SessionStorageService } from "../../../security/session-storage.service";
import { Router } from "@angular/router";

@Component({
  selector: 'plagiarism-request-dialog',
  templateUrl: './plagiarism-request-dialog.component.html',
  styleUrls: ['./plagiarism-request-dialog.component.scss']
})
export class PlagiarismRequestDialogComponent {

  directory: Directory | undefined
  directoryPaths: string[] = []
  requestForm: FormGroup = new FormGroup({})

  constructor(private dialogRef: MatDialogRef<PlagiarismRequestDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any,
              private formBuilder: FormBuilder,
              private teacherService: TeacherService,
              private snackBar: MatSnackBar,
              private sessionStorageService: SessionStorageService,
              private router: Router,
  ) {
    this.directory = this.data.directory;
    const removeRoot = this.data.removeRoot ? true : this.data.removeRoot;

    if (this.directory) {
      this.directoryPaths = getDirectoryPaths(this.directory, '', removeRoot);
    }

    this.requestForm = this.formBuilder.group({
      testDirectories: ['', Validators.required],
      refDirectories: ['', Validators.required],
      reportOutput: ['', [Validators.required, Validators.pattern('[A-Za-z0-9_]+')]],
      noiseThreshold: [null],
      guaranteeThreshold: [null, this.guaranteeThresholdValidator],
      displayThreshold: [null],
      removeImports: [false],
      skipPunctuation: [false],
      truncate: [false],
      disableFilter: [false]
    });
  }

  private guaranteeThresholdValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const noiseThreshold = control.root.get('noiseThreshold')?.value;
    const guaranteeThreshold = control.value;

    if (noiseThreshold !== null && guaranteeThreshold !== null && guaranteeThreshold < noiseThreshold) {
      return {invalidThreshold: true};
    }

    return null;
  }

  onSubmit(request: CheckRequest) {
    if (this.requestForm.valid) {
      request.testDirectories = typeof request.testDirectories === "string" ? [request.testDirectories] : request.testDirectories
      request.refDirectories = typeof request.refDirectories === "string" ? [request.refDirectories] : request.refDirectories
      request.reportOutput = "/report/" + request.reportOutput

      this.teacherService.requestPlagiarismCheck(request).subscribe({
        next: (resp) => {
          this.openSnackBar("Check request sent. If everything is ok your report will be create soon")
          this.dialogRef.close()
        }, error: (err) => {
          if (err.status == 401) {
            this.dialogRef.close()
            this.sessionStorageService.clear();
            this.router.navigate(["/login"])
          } else {
            this.openSnackBar("Something went wrong!", "Ok")
          }
        }
      });
    }
  }

  openSnackBar(message: string, action: string = "Ok") {
    this.snackBar.open(message, action, {duration: 5000});
  }

}
