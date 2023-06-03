import { Injectable } from '@angular/core';
import { BaseApiService } from "./base-api.service";
import { Subject } from "../model/subject";
import { Directory } from "../model/directory";
import { FilesSimilarPair, StudentStatistic } from "../model/files-similar-pair";

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(private baseApiService: BaseApiService) {
  }

  public uploadFiles(files: File[], path: string, teacherId: number) {
    const formData = new FormData();
    for (const file of files) {
      formData.append('files', file, file.name);
    }
    formData.append('path', path);
    formData.append('teacherId', teacherId.toString());

    return this.baseApiService.post("/files/upload", formData, true);
  }

  public download(path: String, isDirectory: boolean) {
    return this.baseApiService.download("/files/download?path=" + path + "&isDirectory=" + isDirectory, true);
  }

  public getPartialTeacherDirectoryStructure(subject: Subject) {
    let path = "/" + subject.folderName
    return this.baseApiService.get<Directory>("/files/get-partial-teacher-structure?path=" + path, true);
  }

  public getAllTeacherDirectoryStructure() {
    return this.baseApiService.get<Directory>("/files/get-full-teacher-structure", true);
  }

  public deleteByPath(path: String, isDirectory: boolean = false) {
    return this.baseApiService.delete("/files/delete?path=" + path + "&isDirectory=" + isDirectory, true);
  }

}
