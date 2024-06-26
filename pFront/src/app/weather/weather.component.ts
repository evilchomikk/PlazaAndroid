import { Component, Input } from '@angular/core';
import { IOurWeather } from '../../model/iour-weather';
import { IOpenMeto } from '../../model/iopen-meto';
import { Degree } from '../../model/degree';
import { SpeedUnit } from '../../model/speed-unit';
import { ICoordinates } from '../../model/icoordinates';
import { ICity } from '../../model/icity';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { IpService } from '../ip.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss',
})
export class WeatherComponent {
  @Input() isOpenMeteo: boolean = true;
  @Input() tempDegrees: Degree = Degree.C;
  @Input() speedUnit: SpeedUnit = SpeedUnit.KMH;
  @Input() isHumidityStatus: boolean = true;
  @Input() listofcities: ICity[] = []; //z bazy danych

  selectedCity: ICity = {
    name: '',
    latitude: 0,
    longitude: 0,
  } as ICity;

  weather: IOurWeather = {
    temp: 0,
    humidity: '0',
    rainChance: 0,
    windSpeed: '0',
  };

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { cities: ICity[] };
    if (state) {
      this.listofcities = state.cities;
    }
  }
  ngOnInit(): void {
    this.setWeather(this.listofcities[0]);
    console.log(this.listofcities);
  }

  async setWeather(city: ICity) {
    var myweather: IOurWeather = {} as IOurWeather;
    console.log(city);
    if (this.isOpenMeteo) {
      try {
        var openWeather: IOpenMeto = await this.getWeatherOpenMeteo(city);
        this.weather.temp = openWeather.current.temperature_2m;
        this.weather.humidity =
          openWeather.current.relative_humidity_2m.toString();
        this.weather.rainChance = openWeather.current.rain;
        this.weather.windSpeed = openWeather.current.wind_speed_10m.toString();
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    } else {
      try {
        var apiWeahter = await this.getWeatherWeatherApi('key', city);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    }
    if (this.isHumidityStatus) {
      this.weather.humidity = this.getHumidityStatus(+this.weather.humidity);
    }
    this.weather.temp = this.convertTempUnits(
      this.weather.temp,
      this.tempDegrees
    );
    this.weather.windSpeed = this.convertSpeedUnits(
      +this.weather.windSpeed,
      this.speedUnit
    ).toString();
  }

  getHumidityStatus(humidity: number): string {
    // 0-30% - suchy, 31-60% - umiarkowany, 61-100% - wilgotny

    const _humidity: number = +humidity;

    if (humidity <= 30) {
      return 'suchy';
    } else if (humidity <= 60) {
      return 'umiarkowany';
    } else if (humidity <= 100) {
      return 'wilgotny';
    }
    return 'nieznany';
  }
  convertTempUnits(temp: number, unit: Degree): number {
    switch (unit) {
      case Degree.C:
        return temp;
      case Degree.F:
        return (temp * 9) / 5 + 32;
      case Degree.K:
        return temp + 273.15;
      default:
        return temp;
    }
  }
  convertSpeedUnits(speed: number, unit: SpeedUnit): number {
    switch (unit) {
      case SpeedUnit.KMH:
        return speed;
      case SpeedUnit.MPH:
        return speed / 1.609344;
      case SpeedUnit.MS:
        return speed / 3.6;
      default:
        return speed;
    }
  }
  getWeatherOpenMeteo(city: ICity): Promise<IOpenMeto> {
    const url =
      'https://api.open-meteo.com/v1/forecast?latitude=' +
      city.latitude +
      '&longitude=' +
      city.longitude +
      '&current=temperature_2m,relative_humidity_2m,rain,wind_speed_10m';

    return fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data as IOpenMeto;
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
        throw error; // Rethrow the error for handling in the calling code
      });
  }

  getWeatherWeatherApi(key: String, city: ICity) {
    const url =
      'https://api.weatherapi.com/v1/current.json?key={key}&q={latitude},{longitude}&aqi=no';
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.weather.temp = data.current.temp_c;
        this.weather.humidity = data.current.humidity;
        this.weather.rainChance = data.current.precip_mm;
        this.weather.windSpeed = data.current.wind_kph;
      });
  }
}
