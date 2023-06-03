import { Component } from '@angular/core';
import { SessionStorageService } from "../../security/session-storage.service";
import { RoleEnum, UserDto } from "../../model/user";
import { Router } from "@angular/router";
import { UpdateAccountDialogComponent } from "../diaglos/update-account-dialog/update-account-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  user: UserDto
  isTeacher: boolean = false

  constructor(private sessionStorageService: SessionStorageService,
              private router: Router,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) {
    this.user = this.sessionStorageService.getUser();
    this.isTeacher = this.sessionStorageService.hasRole(RoleEnum.ROLE_TEACHER);
  }

  logout() {
    this.sessionStorageService.clear();
    this.router.navigate(["/login"])
  }

  updateData() {
    const dialogRef = this.dialog.open(UpdateAccountDialogComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.openSnackBar("Your data ware updated", "Ok")
        this.user = this.sessionStorageService.getUser()
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {duration: 5000});
  }

  navigateTo(to: string) {
    this.router.navigate([to])
  }

}
