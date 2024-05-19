import { Component } from '@angular/core';
import { IpService } from '../ip.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { end } from '@popperjs/core';
import { ICity } from '../../model/icity';
import { Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-new-orders',
  templateUrl: './new-orders.component.html',
  styleUrl: './new-orders.component.scss'
})
export class NewOrdersComponent {

  @Input() listofcities: ICity[] = [];

  constructor(private router: Router, private orderService: OrderService) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { cities: ICity[] };
    if (state) {
      this.listofcities = state.cities;
    }
  }

  profileForm = new FormGroup({
    cityName: new FormControl(''),
    orderTypeName: new FormControl(''),
    cost: new FormControl(''),
    duration: new FormControl(''),
    x: new FormControl(''),
    y: new FormControl(''),
  });
  
  onSubmit(): void {
    if (this.profileForm.valid) {
      const formValue = this.profileForm.value;
      const orderDto = {
        cityName: formValue.cityName,
        orderTypeName: formValue.orderTypeName,
        value: formValue.cost,
        duration: "PT"+formValue.duration+"H",
        x: formValue.x,
        y: formValue.y
      };
      if (this.profileForm.get('orderTypeName')?.value === 'wantToBuy') {
        this.orderService.addOrder(orderDto)
        .subscribe(
          response => {
            console.log('Order submitted successfully', response);
          },
          error => {
            console.error('Error submitting order', error);
          }
        );

      }
      else if (this.profileForm.get('orderTypeName')?.value === 'wantToSell') {
        this.orderService.addOrderWithLocation(orderDto)
        .subscribe(
          response => {
            console.log('Order submitted successfully', response);
          },
          error => {
            console.error('Error submitting order', error);
          }
        );
      }
      
    }
  }

    get orderTypeName() {
      return this.profileForm.get('orderTypeName')?.value;
    }

}
