import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Directory } from "../../../model/directory";

@Component({
  selector: 'app-student-directories-dialog',
  templateUrl: './student-directories-dialog.component.html',
  styleUrls: ['./student-directories-dialog.component.scss']
})
export class StudentDirectoriesDialogComponent {

  directory: Directory | undefined

  constructor(private dialogRef: MatDialogRef<StudentDirectoriesDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.directory = this.data.directory
  }

}
