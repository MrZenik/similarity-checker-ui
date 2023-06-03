import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { SessionStorageService } from "./session-storage.service";
import { RoleEnum } from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class TeacherGuard {

  constructor(private sessionStorageService: SessionStorageService, private router: Router) {
  }

  canActivate(): boolean {
    if (this.sessionStorageService.getToken() && this.sessionStorageService.getRoles().includes(RoleEnum.ROLE_TEACHER)) {
      return true;
    } else {
      this.sessionStorageService.clear();
      this.router.navigate(['/login']);
      return false;
    }
  }
}
