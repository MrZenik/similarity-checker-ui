import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from "../../security/session-storage.service";
import { RoleEnum } from "../../model/user";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  isAdmin: boolean = false;
  isTeacher: boolean = false;
  isStudent: boolean = false;

  constructor(private sessionStorageService: SessionStorageService) {
  }

  ngOnInit(): void {
    this.isAdmin = this.sessionStorageService.hasRole(RoleEnum.ROLE_ADMIN);
    this.isTeacher = this.sessionStorageService.hasRole(RoleEnum.ROLE_TEACHER);
    this.isStudent = this.sessionStorageService.hasRole(RoleEnum.ROLE_STUDENT);
  }

}
