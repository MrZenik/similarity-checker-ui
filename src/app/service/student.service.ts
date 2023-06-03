import { Injectable } from '@angular/core';
import { BaseApiService } from "./base-api.service";
import { Subject } from "../model/subject";
import { Observable } from "rxjs";
import { Directory } from "../model/directory";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private apiService: BaseApiService) {
  }

  public getAllStudentSubjects(userId: number): Observable<Subject[]>{
    return this.apiService.get<Subject[]>("/enrollments/" + userId, true)
  }

  public getStudentSubjectFiles(path: string, teacherId: number, subjectId: number) {
    const formData = new FormData();
    formData.append('path', path);
    formData.append('subjectId', subjectId.toString());
    formData.append('teacherId', teacherId.toString());
    return this.apiService.post<Directory>("/files/get-structure", formData, true);
  }

}
