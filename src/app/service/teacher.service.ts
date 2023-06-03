import { Injectable } from '@angular/core';
import { BaseApiService } from "./base-api.service";
import { Subject } from "../model/subject";
import { Observable } from "rxjs";
import { UserDto } from "../model/user";
import { CheckRequest } from "../model/plagiarsim-request";

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private apiService: BaseApiService) {
  }

  public getAllTeacherSubjects(): Observable<Subject[]> {
    return this.apiService.get<Subject[]>("/subjects", true);
  }

  public getALlEnrolledStudents(subjectId: number): Observable<UserDto[]> {
    return this.apiService.get<UserDto[]>("/enrollments/get-users/" + subjectId, true);
  }

  public findStudentsByEmail(email: string) {
    return this.apiService.get<UserDto[]>("/users/find-users?email=" + email, true)
  }

  public enrollStudents(studentIds: number[], subjectId: number) {
    return this.apiService.post("/enrollments/enroll", {studentIds: studentIds, subjectId: subjectId}, true);
  }

  public requestPlagiarismCheck(request: CheckRequest) {
    return this.apiService.post("/check", request, true);
  }

}
