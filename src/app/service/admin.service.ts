import { Injectable } from '@angular/core';
import { BaseApiService } from "./base-api.service";
import { UserDto } from "../model/user";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private apiService: BaseApiService) {
  }

  public getWaitingForApprove(): Observable<UserDto[]> {
    return this.apiService.get<UserDto[]>("/admin/get-not-approved", true)
  }

  public approve(id: number) {
    return this.apiService.post("/admin/approve/" + id, {}, true)
  }

  public setStudentRole(id: number) {
    return this.apiService.post("/admin/set-student/" + id, {}, true)
  }

  public delete(id: number) {
    return this.apiService.delete("/admin/" + id, true)
  }

}
