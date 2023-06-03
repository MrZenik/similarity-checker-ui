import { Component, OnInit } from '@angular/core';
import { AdminService } from "../../../service/admin.service";
import { UserDto } from "../../../model/user";
import { SessionStorageService } from "../../../security/session-storage.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AreYouSureDialogComponent } from "../../diaglos/are-you-sure-dialog/are-you-sure-dialog.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {

  public users: UserDto[] = []

  constructor(private adminService: AdminService,
              private sessionStorageService: SessionStorageService,
              private router: Router,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.loadUsers()
  }

  public loadUsers() {
    this.adminService.getWaitingForApprove().subscribe({
      next: (users: UserDto[]) => {
        this.users = users
      }, error: (error) => {
        if (error.status == 401) {
          this.sessionStorageService.clear();
          this.router.navigate(["/login"])
        } else {
          this.openSnackBar("Something went wrong!")
        }
      }
    })
  }

  public delete(user: UserDto) {
    const dialogRef = this.dialog.open(AreYouSureDialogComponent, {
      minWidth: '200px',
      minHeight: '150px',
      data: {title: ' to completely delete user'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.adminService.delete(user.id).subscribe({
            next: (res) => {
              this.removeUserById(user.id)
              this.openSnackBar("User was completely deleted!")
            }, error: err => {
              if (err.status == 401) {
                this.sessionStorageService.clear();
                this.router.navigate(["/login"])
              } else {
                this.openSnackBar("Something went wrong!")
              }
            }
          }
        )
      }
    })
  }

  public approve(user: UserDto) {
    const dialogRef = this.dialog.open(AreYouSureDialogComponent, {
      minWidth: '200px',
      minHeight: '150px',
      data: {title: ' to approve "Teacher" status'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.adminService.approve(user.id).subscribe({
            next: (res) => {
              this.removeUserById(user.id)
              this.openSnackBar("User was granted 'Teacher' role!")
            }, error: err => {
              if (err.status == 401) {
                this.sessionStorageService.clear();
                this.router.navigate(["/login"])
              } else {
                this.openSnackBar("Something went wrong!")
              }
            }
          }
        )
      }
    })
  }

  public setStudentRole(user: UserDto) {
    const dialogRef = this.dialog.open(AreYouSureDialogComponent, {
      minWidth: '200px',
      minHeight: '150px',
      data: {title: ' to set "Student" status'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.adminService.setStudentRole(user.id).subscribe({
            next: (res) => {
              this.removeUserById(user.id)
              this.openSnackBar("User was granted 'Student' role!")
            }, error: err => {
              if (err.status == 401) {
                this.sessionStorageService.clear();
                this.router.navigate(["/login"])
              } else {
                this.openSnackBar("Something went wrong!")
              }
            }
          }
        )
      }
    })
  }

  private removeUserById(userId: number): void {
    this.users = this.users.filter(user => user.id !== userId);
  }

  openSnackBar(message: string, action: string = "Ok") {
    this.snackBar.open(message, action, {duration: 5000});
  }

}
