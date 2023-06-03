import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-are-you-sure-dialog',
  templateUrl: './are-you-sure-dialog.component.html',
  styleUrls: ['./are-you-sure-dialog.component.scss']
})
export class AreYouSureDialogComponent {

  title: string = ""

  constructor(private dialogRef: MatDialogRef<AreYouSureDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.title = this.data.title
  }

  onClick(value: boolean) {
    this.dialogRef.close(value)
  }

}
