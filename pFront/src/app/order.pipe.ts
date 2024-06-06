
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'order'
})
export class OrderPipe implements PipeTransform {

  transform(value: string): string {
    if (value === 'wantToBuy') {
      return 'Wystawiam';
    } else if (value === 'wantToSell') {
      return 'Oddam';
    }
    return value;
  }

}