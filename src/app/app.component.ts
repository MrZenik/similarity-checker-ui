import { Component, OnDestroy } from '@angular/core';
import { SessionStorageService } from "./security/session-storage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy{

  constructor(private sessionStorageService: SessionStorageService) {
  }

  ngOnDestroy(): void {
    this.sessionStorageService.clear();
  }

}
