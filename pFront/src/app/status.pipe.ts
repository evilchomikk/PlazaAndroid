import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform { // change Status to StatusPipe

  transform(value: string): string {
    if (value === 'accepted') {
      return 'zaakceptowane';
    }
    if (value === 'rejected') {
      return 'odrzucone';
    }
    if (value === 'waiting') {
      return 'oczekujące';
    }
    return value;
  }
}