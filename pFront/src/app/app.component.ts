import { Component, OnInit } from '@angular/core';
import { ICity } from '../model/icity';
import { Router, RouterLink } from '@angular/router';
import { WeatherComponent } from './weather/weather.component';
import { OrdersComponent } from './orders/orders.component';
import { every } from 'rxjs';
import { IOrders } from '../model/iorders';
import { IpService } from './ip.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {


  title = 'pFront';

  cities: ICity[] = [];

  orders: IOrders[] = [];

  constructor(private router: Router,private ip : IpService) {}

  ngOnInit(): void {
    this.getCities().then((cities) => {
      this.cities = cities;
      console.log(this.cities); // Log cities to check the structure
    });

    this.getOrders().then((orders) => {
      this.orders = orders;
      console.log(this.orders); // Log cities to check the structure
    });

  }

  async getCities(): Promise<ICity[]> {
    return await fetch('http://'+this.ip.Ip+':8080/api/city/getAllCities')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        console.log(response);
        return response.json();
      })
      .then((data) => {
        // Assuming the data structure is correct
        return data.map((city: any) => ({
          name: city.cityName,
          latitude: city.latitude,
          longitude: city.longitude
          
        })) as ICity[];
        
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
        return []; // Return empty array in case of error
      });

      console.log(this.cities);
  }

  async getOrders(): Promise<IOrders[]> {
    try {
      const response = await fetch('http://localhost:8080/api/order/getAllOrders');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: any[] = await response.json();
      return data.map((order) => {
        const newOrder: IOrders = {
          id: order.id,
          cityName: order.cityName,
          statusName: {
            statusesName: order.statusName,
          },
          idOrdermaker: {
            id: order.idOrdermaker.id,
            username: order.idOrdermaker.username,
            password: order.idOrdermaker.password,
            currency: order.idOrdermaker.currency,
          },
          idOrdertaker: order.idOrdertaker ? {
            id: order.idOrdertaker.id,
            username: order.idOrdertaker.username,
            password: order.idOrdertaker.password,
            currency: order.idOrdertaker.currency,
          } : null,
          orderTypeName: {
            ordertypeName: order.orderTypeName,
          },
          duration: order.duration,
          value: order.value,
          isActive: order.isActive,
        };
        return newOrder as IOrders;
      });
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      return [];
    }
  }

  goToWeather() {
    this.router.navigate(['/weather'],{state: {cities: this.cities}});
  }

  goToOrders() {
    this.router.navigate(['/orders']),{state: {orders: this.orders}};
  }

  goToNewOrders() {
    this.router.navigate(['/new-orders'], {state: {cities: this.cities}});
  }

}
