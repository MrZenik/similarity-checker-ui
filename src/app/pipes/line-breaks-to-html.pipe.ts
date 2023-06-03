import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'lineBreaksToHtml' })
export class LineBreaksToHtmlPipe implements PipeTransform {

  transform(value: string): string {
    return value.replace(/\n/g, '<br>');
  }

}
