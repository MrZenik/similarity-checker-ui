export interface FilesSimilarPair {
  id: number,
  file1: string,
  file2: string,
  code1: string,
  code2: string,
  similarityScore: number,
  teacherId: number
}

export interface StudentStatistic {
  file1: string,
  pairs: StudentStatisticDto[]
}

export interface StudentStatisticDto {
  id: number,
  file2: string,
  similarityScore: number
}
