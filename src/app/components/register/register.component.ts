import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { LoginService } from "../../service/login.service";
import { SessionStorageService } from "../../security/session-storage.service";
import { Router } from "@angular/router";
import { RoleEnum, UserCreateDto, UserDto } from "../../model/user";
import { passwordMatchValidatorOnCreate } from "../../validator/password-match-validator.validator";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  public registerForm: FormGroup = new FormGroup({})
  public error: string | undefined
  public message: string | undefined

  constructor(private loginService: LoginService,
              private sessionStorageService: SessionStorageService,
              private formBuilder: FormBuilder,
              private router: Router) {
    this.registerForm = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.min(2)]],
      lastName: ["", [Validators.required, Validators.min(2)]],
      email: ["", [Validators.email, Validators.required]],
      password: ["", [Validators.required, Validators.min(8)]],
      passwordRepeat: ["", [Validators.required, Validators.min(8)]],
      roleName: [RoleEnum.ROLE_STUDENT, [Validators.required]]
    }, {validators: passwordMatchValidatorOnCreate});
  }

  onSubmit(userCreateDto: UserCreateDto) {
    if (this.registerForm.valid) {
      this.loginService.register(userCreateDto).subscribe({
        next: (user: UserDto) => {
          if (user.roles[0].name === "ROLE_STUDENT") {
            this.message = "Your account was successfully created. Now you can login"
          } else {
            this.message = "Your request sent to administrator review"
          }
        },
        error: (error) => {
          if (error.status == 409) {
            this.error = "User with such a email already exist!"
          } else {
            this.error = "Something went wrong. Try again please"
          }
        }
      })
    }

    this.registerForm.reset()
  }

}

