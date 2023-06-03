import { Component, OnInit } from '@angular/core';
import { LoginService } from "../../service/login.service";
import { SessionStorageService } from "../../security/session-storage.service";
import { LoginRequest, UserDto } from "../../model/user";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { FilesSimilarPair } from "../../model/files-similar-pair";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public loginForm: FormGroup = this.formBuilder.group({
    email: ["", [Validators.email, Validators.required]],
    password: ["", [Validators.required,]]
  });
  public error: string | undefined

  constructor(private loginService: LoginService,
              private sessionStorageService: SessionStorageService,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  public onSubmit(request: LoginRequest) {
    this.loginService.login(request).subscribe({
      next: (userDto: UserDto) => {
        this.sessionStorageService.setToken(userDto.token);
        this.sessionStorageService.setUser(userDto);
        this.router.navigate(["/home"])
      },
      error: (error) => {
        this.error = error.status == 401 ? "Invalid email or password!" : "Something went wrong!";
        return error;
      }
    })
  }
}
