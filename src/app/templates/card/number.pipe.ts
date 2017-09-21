import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'number'
})
export class NumberPipe implements PipeTransform {

  transform(value: number, args?: any): string {
    if (value == 10) {
      return 'A';
    }
    if (value == 11) {
      return 'B';
    }
    if (value == 12) {
      return 'C';
    }
    if (value == 13) {
      return 'D';
    }
    if (value == 14) {
      return 'E';
    }
    if (value == 15) {
      return 'F';
    }
    if (value == 16) {
      return 'S';
    }
    if (value == 17) {
      return '';
    }
    return '' + value;
  }

}
