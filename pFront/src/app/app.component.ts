import { Component, OnInit } from '@angular/core';
import { ICity } from '../model/icity';
import { Router, RouterLink } from '@angular/router';
import { WeatherComponent } from './weather/weather.component';
import { OrdersComponent } from './orders/orders.component';
import { every } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {


  title = 'pFront';

  cities: ICity[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.getCities().then((cities) => {
      this.cities = cities;
      console.log(this.cities); // Log cities to check the structure
    });
  }

  getCities(): Promise<ICity[]> {
    return fetch('http://localhost:8080/api/city/getAllCities')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Assuming the data structure is correct
        return data.map((city: any) => ({
          name: city.cityName,
          latitude: city.latitude,
          longitude: city.longitude,
        })) as ICity[];
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
        return []; // Return empty array in case of error
      });
  }

  goToWeather() {
    this.router.navigate(['/weather'],{state: {cities: this.cities}});
  }

  goToOrders() {
    this.router.navigate(['/orders']);
  }



}
