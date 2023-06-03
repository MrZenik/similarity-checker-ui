import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SessionStorageService } from "../../../security/session-storage.service";
import { Router } from "@angular/router";
import { Subject, SubjectCreateRequest } from "../../../model/subject";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SubjectService } from "../../../service/subject.service";

@Component({
  selector: 'app-add-subject-dialog',
  templateUrl: './add-subject-dialog.component.html',
  styleUrls: ['./add-subject-dialog.component.scss']
})
export class AddSubjectDialogComponent {

  createSubjectForm: FormGroup = new FormGroup({})
  public error: string | undefined
  public message: string | undefined
  isEdit: boolean = false;
  subject: Subject | undefined

  constructor(private dialogRef: MatDialogRef<AddSubjectDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any,
              private sessionStorageService: SessionStorageService,
              private formBuilder: FormBuilder,
              private subjectService: SubjectService,
              private router: Router,
              private snackBar: MatSnackBar
  ) {
    if (this.data?.subject) {
      this.isEdit = true
      this.subject = this.data.subject
      this.createSubjectForm = this.formBuilder.group({
        name: [this.subject?.name, [Validators.required, Validators.minLength(4)]],
        folderName: [this.subject?.folderName, [Validators.required, Validators.minLength(4), Validators.pattern('[A-Za-z0-9_]+')]],
      });
      this.createSubjectForm.get('folderName')?.disable()
    } else {
      this.createSubjectForm = this.formBuilder.group({
        name: ["", [Validators.required, Validators.minLength(4)]],
        folderName: ["", [Validators.required, Validators.minLength(4), Validators.pattern('[A-Za-z0-9_]+')]],
      });
    }
  }

  onSubmit(request: SubjectCreateRequest) {
    if (!this.isEdit) {
      this.create(request)
    } else {
      this.update(request)
    }
  }

  create(request: SubjectCreateRequest) {
    this.subjectService.createSubject(request).subscribe({
      next: (subject: Subject) => {
        this.dialogRef.close(subject)
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

  update(request: SubjectCreateRequest) {
    this.subjectService.updateSubjectById(this.subject?.id!, request.name).subscribe({
      next: (subject: Subject) => {
        this.dialogRef.close(subject)
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

  openSnackBar(message: string, action: string = "Ok") {
    this.snackBar.open(message, action, {duration: 5000});
  }

}
