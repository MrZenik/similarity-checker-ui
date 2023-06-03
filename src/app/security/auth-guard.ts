import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { SessionStorageService } from "./session-storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private sessionStorageService: SessionStorageService, private router: Router) {
  }

  canActivate(): boolean {
    if (this.sessionStorageService.getToken()) {
      return true;
    } else {
      this.sessionStorageService.clear();
      this.router.navigate(['/login']);
      return false;
    }
  }
}
