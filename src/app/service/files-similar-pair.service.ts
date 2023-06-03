import { Injectable } from '@angular/core';
import { BaseApiService } from "./base-api.service";
import { FilesSimilarPair, StudentStatistic } from "../model/files-similar-pair";

@Injectable({
  providedIn: 'root'
})
export class FilesSimilarPairService {

  constructor(private baseApiService: BaseApiService) { }

  getFilesSimilarPairs(studentEmail: string, subjectId: number) {
    return this.baseApiService.get<StudentStatistic[]>(`/files-similar-pairs?email=${studentEmail}&subjectId=${subjectId}` , true);
  }

  getFilesSimilarPairById(id: number) {
    return this.baseApiService.get<FilesSimilarPair>("/files-similar-pairs/" + id, true);
  }

}
