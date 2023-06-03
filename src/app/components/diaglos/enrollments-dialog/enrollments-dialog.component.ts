import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Subject } from "../../../model/subject";
import { UserDto } from "../../../model/user";
import { TeacherService } from "../../../service/teacher.service";
import { SessionStorageService } from "../../../security/session-storage.service";
import { Router } from "@angular/router";
import { FormControl } from "@angular/forms";
import { map, Observable, startWith, switchMap } from "rxjs";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-enrollments-dialog',
  templateUrl: './enrollments-dialog.component.html',
  styleUrls: ['./enrollments-dialog.component.scss']
})
export class EnrollmentsDialogComponent {

  subject: Subject;
  enrolledStudents: UserDto[] = [];
  allStudents: UserDto[] = [];
  searchControl = new FormControl("", {updateOn: 'blur'});
  filteredStudents: Observable<UserDto[]> | undefined;
  isAbleToEnroll: boolean = false;
  private enrolledStudentsFromDb: UserDto[] = []

  constructor(
    private dialogRef: MatDialogRef<EnrollmentsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private teacherService: TeacherService,
    private sessionStorageService: SessionStorageService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.subject = this.data.subject;
    if (this.subject) {
      this.getALlEnrolledStudents(this.subject.id);
    }
    this.filteredStudents = this.searchControl.valueChanges.pipe(
      startWith(''),
      switchMap((value) => this.filterOptions(value ? value : "")),
      map((filteredStudents) =>
        filteredStudents.filter(
          (student) =>
            !this.enrolledStudents.find((option) => option.id === student.id)
        )
      )
    );
  }

  filterOptions(value: string): Promise<UserDto[]> {
    const filterValue = typeof value === 'string' ? value.toLowerCase() : '';
    return this.findStudentsByEmail(filterValue);
  }

  optionSelected(event: MatAutocompleteSelectedEvent): void {
    this.isAbleToEnroll = true
    const selectedStudent = this.allStudents.find(
      (student) => student.email === event.option.viewValue
    );
    if (selectedStudent) {
      this.enrolledStudents.push(selectedStudent);
      this.searchControl.setValue('');
      this.filteredStudents = this.filteredStudents?.pipe(
        map((students) =>
          students.filter((student) => student.email !== selectedStudent.email)
        )
      );
    }
  }

  removeOption(email: string): void {
    this.isAbleToEnroll = true
    const index = this.enrolledStudents.findIndex((student) => student.email === email);
    if (index !== -1) {
      this.enrolledStudents.splice(index, 1);
    }
  }

  public getALlEnrolledStudents(subjectId: number) {
    this.teacherService.getALlEnrolledStudents(subjectId).subscribe({
      next: (users: UserDto[]) => {
        this.enrolledStudents = [...users];
        this.enrolledStudentsFromDb = [...users];
      },
      error: (err) => {
        if (err.status === 401) {
          this.sessionStorageService.clear();
          this.router.navigate(['/login']);
        } else {
          this.openSnackBar("Something went wrong!")
        }
      }
    });
  }

  public findStudentsByEmail(email: string): Promise<UserDto[]> {
    return new Promise((resolve, reject) => {
      if (email.trim() !== "") {
        this.teacherService.findStudentsByEmail(email).subscribe({
          next: (students: UserDto[]) => {
            this.allStudents = students;
            resolve(this.allStudents);
          },
          error: (error) => {
            if (error.status === 401) {
              this.sessionStorageService.clear();
              this.router.navigate(['/login']);
            } else {
              this.openSnackBar("Something went wrong!")
            }
            reject(error)
          }
        });
      }
    });
  }

  public enroll() {
    let studentsIdsToRemove: number[] = this.enrolledStudentsFromDb
      .filter(dbStudent => !this.enrolledStudents.some(student => student.id === dbStudent.id))
      .map(student => student.id);

    let selectedStudentsIds = this.enrolledStudents
      .filter(dbStudent => !this.enrolledStudentsFromDb.some(student => student.id === dbStudent.id))
      .map(student => student.id);
    selectedStudentsIds.push(...studentsIdsToRemove);

    this.teacherService.enrollStudents(selectedStudentsIds, this.subject?.id).subscribe({
      next: () => {
        this.dialogRef.close(true)
      }
    })
  }

  openSnackBar(message: string, action: string = "Ok") {
    this.snackBar.open(message, action, {duration: 5000});
  }

}
