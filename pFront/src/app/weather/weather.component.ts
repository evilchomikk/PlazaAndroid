import { Component, Input } from '@angular/core';
import { IOurWeather } from '../../model/iour-weather';
import { IOpenMeto } from '../../model/iopen-meto';
import { Degree } from '../../model/degree';
import { SpeedUnit } from '../../model/speed-unit';
import { ICoordinates } from '../../model/icoordinates';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss'
})
export class WeatherComponent {

  @Input() isOpenMeteo: boolean = false;
  @Input() tempDegrees: Degree = Degree.C;
  @Input() speedUnit: SpeedUnit = SpeedUnit.KMH;
  @Input() isHumidityStatus: boolean = false;

  weather: IOurWeather = {
    temp: 0,
    humidity: 0,
    rainChance: 0,
    windSpeed: 0
  } as IOurWeather;
  coordinates: ICoordinates = {
    latitude: 0,
    longitude: 0  
  } as ICoordinates;
  

  ngOnInit(): void {
    //this.coordinates.latitude = // get the latitude value from the select option element
    //this.coordinates.longitude = // get the longitude value from the select option element
    if(this.isOpenMeteo) {
      this.getWeatherOpenMeteo(this.coordinates.latitude, this.coordinates.longitude);
    } else {
      this.getWeatherWeatherApi('key', this.coordinates.latitude, this.coordinates.longitude);
    }
  }

  getHumidityStatus(): string {   // 0-30% - suchy, 31-60% - umiarkowany, 61-100% - wilgotny
    if(this.weather.humidity <= 30){
      return 'suchy';
    }else if(this.weather.humidity <= 60){
      return 'umiarkowany';
    }
    else if(this.weather.humidity <= 100){
      return 'wilgotny';
    }
    return 'nieznany';
  }

  getWeatherOpenMeteo(latitude: number, longitude: number) {
    const url = 'https://api.open-meteo.com/v1/forecast?latitude={latitude}&longitude={longitude}&current=temperature_2m,relative_humidity_2m,rain,wind_speed_10m/weather';
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.weather.temp = data.current.temperature_2m;
        this.weather.humidity = data.current.relative_humidity_2m;
        this.weather.rainChance = data.current.rain;
        this.weather.windSpeed = data.current.wind_speed_10m;
      });
  } 

    getWeatherWeatherApi(key: String, latitude: number, longitude: number){
    const url = 'https://api.weatherapi.com/v1/current.json?key={key}&q={latitude},{longitude}&aqi=no';
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.weather.temp = data.current.temp_c;
        this.weather.humidity = data.current.humidity;
        this.weather.rainChance = data.current.precip_mm;
        this.weather.windSpeed = data.current.wind_kph;
      });
    }
}
