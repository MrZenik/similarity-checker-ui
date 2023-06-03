import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FilesSimilarPair, StudentStatistic } from "../../../model/files-similar-pair";
import { FilesSimilarPairService } from "../../../service/files-similar-pair.service";
import { Router } from "@angular/router";

@Component({
  selector: 'student-statistics',
  templateUrl: './student-statistics.component.html',
  styleUrls: ['./student-statistics.component.scss']
})
export class StudentStatisticComponent implements OnChanges {
  @Input() studentStatistics: StudentStatistic[] = [];
  pair: FilesSimilarPair | undefined

  constructor(private filesSimilarPairService: FilesSimilarPairService,
              private router: Router) {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.pair = undefined
  }

  getFilesSimilarPairById(id: number) {
    this.filesSimilarPairService.getFilesSimilarPairById(id).subscribe({
      next: (filesSimilarPair: FilesSimilarPair) => {
        this.pair = filesSimilarPair
      }, error: err => {
        this.router.navigate(["/home"])
      }
    })
  }

}
