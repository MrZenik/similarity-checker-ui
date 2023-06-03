import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Directory } from "../../model/directory";
import { SessionStorageService } from "../../security/session-storage.service";
import { Router } from "@angular/router";
import { AreYouSureDialogComponent } from "../diaglos/are-you-sure-dialog/are-you-sure-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { FilesService } from "../../service/files.service";

@Component({
  selector: 'directory-list-actions',
  templateUrl: './directory-list-actions.component.html',
  styleUrls: ['./directory-list-actions.component.scss']
})
export class DirectoryListActionsComponent {

  @Input() directory: Directory | undefined;
  @Input() path: string = "";
  @Output() updateDirectory: EventEmitter<any> = new EventEmitter<any>();

  constructor(private filesService: FilesService,
              private sessionStorageService: SessionStorageService,
              private router: Router,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) {
  }

  download(path: string = '', isDirectory: boolean = false) {
    this.downloadFile(path, isDirectory)
  }

  public downloadFile(path: String, isDirectory: boolean = false) {
    this.filesService.download(path, isDirectory)
      .subscribe({
        next: (resp: Blob) => {
          // Create a temporary URL for the file blob
          const url = URL.createObjectURL(resp);
          // Create a link element and simulate a click to trigger the file download
          const link = document.createElement('a');
          link.href = url;
          link.download = 'files.zip';
          link.click();
          // Clean up the temporary URL
          URL.revokeObjectURL(url);
          if (isDirectory) {
            path = path.slice(0, path.length - 1)
          }

          this.deleteByPath(path + ".zip", false, false);
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

  public delete(path: string, isDirectory: boolean = false) {
    const dialogRef = this.dialog.open(AreYouSureDialogComponent, {
      minWidth: '200px',
      minHeight: '150px',
      data: {title: ' to delete this folder/files'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteByPath(path, isDirectory);
      }
    });

  }

  private deleteByPath(path: String, isDirectory: boolean = false, showMessage = true) {
    if (path === "report/" || path === "") {
      this.openSnackBar("You cannot delete this directory!")
      return;
    }
    this.filesService.deleteByPath(path, isDirectory).subscribe({
      next: () => {
        showMessage ? this.openSnackBar("Item was deleted!", "Ok") : undefined
        this.emitUpdate()
      },
      error: (err) => {
        if (err.status == 401) {
          this.sessionStorageService.clear();
          this.router.navigate(["/login"])
        } else {
          this.openSnackBar("Something went wrong!")
        }
      }
    })
  }

  emitUpdate() {
    this.updateDirectory.emit(true)
  }

  openSnackBar(message: string, action: string = "Ok") {
    this.snackBar.open(message, action, {duration: 5000});
  }

}
