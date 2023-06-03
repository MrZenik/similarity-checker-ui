import { Component, Input } from '@angular/core';
import { Directory } from "../../model/directory";

@Component({
  selector: 'directory-list',
  templateUrl: './directory-list.component.html',
  styleUrls: ['./directory-list.component.scss']
})
export class DirectoryListComponent {

  @Input('directory') directory: Directory | undefined;

}
