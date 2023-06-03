export interface Subject {
  id: number,
  name: string,
  folderName: string,
  teacherId: number
}

export interface SubjectCreateRequest {
  name: string,
  folderName: string,
}
