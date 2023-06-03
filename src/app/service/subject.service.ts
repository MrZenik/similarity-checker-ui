import { Injectable } from '@angular/core';
import { Subject, SubjectCreateRequest } from "../model/subject";
import { BaseApiService } from "./base-api.service";

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private apiService: BaseApiService) { }

  public createSubject(request: SubjectCreateRequest) {
    return this.apiService.post<Subject>("/subjects", request, true);
  }

  public updateSubjectById(subjectId: number, name: string) {
    return this.apiService.put<Subject>(`/subjects/${subjectId}`, {name: name}, true)
  }

  public getSubjectById(subjectId: number) {
    return this.apiService.get<Subject>(`/subjects/${subjectId}`, true)
  }

  public deleteSubjectById(subjectId: number) {
    return this.apiService.delete(`/subjects/${subjectId}`, true);
  }

}
