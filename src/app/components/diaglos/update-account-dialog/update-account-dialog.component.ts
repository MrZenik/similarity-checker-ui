import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { UserService } from "../../../service/user.service";
import { UserDto, UserUpdateDto } from "../../../model/user";
import { SessionStorageService } from "../../../security/session-storage.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { passwordMatchValidatorOnUpdate } from "../../../validator/password-match-validator.validator";

@Component({
  selector: 'app-update-account-dialog',
  templateUrl: './update-account-dialog.component.html',
  styleUrls: ['./update-account-dialog.component.scss']
})
export class UpdateAccountDialogComponent {

  user: UserDto
  updateUserForm: FormGroup = new FormGroup({})

  constructor(private dialogRef: MatDialogRef<UpdateAccountDialogComponent>,
              private sessionStorageService: SessionStorageService,
              private userService: UserService,
              private router: Router,
              private snackBar: MatSnackBar,
              private formBuilder: FormBuilder) {
    this.user = this.sessionStorageService.getUser()
    this.updateUserForm = this.formBuilder.group({
      firstName: [this.user.firstName, [Validators.required, Validators.min(2)]],
      lastName: [this.user.lastName, [Validators.required, Validators.min(2)]],
      oldPassword: [null],
      newPassword: [null, Validators.min(8)],
      newPasswordRepeat: [null, Validators.min(8)],
    }, {validators: passwordMatchValidatorOnUpdate})

  }

  update(userUpdateDto: UserUpdateDto) {
    this.userService.updateById(this.user.id, userUpdateDto).subscribe({
      next: (user: UserDto) => {
        this.sessionStorageService.setUser(user)
        this.dialogRef.close(true)
      }, error: err => {
        if (err.status == 401) {
          this.sessionStorageService.clear()
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
