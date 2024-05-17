import { Component } from '@angular/core';
import { IpService } from '../ip.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { end } from '@popperjs/core';
import { ICity } from '../../model/icity';
import { Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-orders',
  templateUrl: './new-orders.component.html',
  styleUrl: './new-orders.component.scss'
})
export class NewOrdersComponent {

  @Input() listofcities: ICity[] = [];

  constructor(private router: Router) {
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
    endDate: new FormControl(''),
    x: new FormControl(''),
    y: new FormControl(''),
  });
  
  onSubmit(): void {
    if (this.profileForm.valid) {
      console.log('Form Submitted', this.profileForm.value);
      if (this.profileForm.get('orderTypeName')?.value === 'Want To Sell') {
        // addOrder()
      }
      else if (this.profileForm.get('orderTypeName')?.value === 'Want To Buy') {
        // addOrderWithLocation()
      }
      
    }
  }

    get orderTypeName() {
      return this.profileForm.get('orderTypeName')?.value;
    }

}
