import { Component, Input } from '@angular/core';
import { IOurWeather } from '../../model/iour-weather';
import { IOpenMeto } from '../../model/iopen-meto';
import { Degree } from '../../model/degree';
import { SpeedUnit } from '../../model/speed-unit';

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

  weather: IOurWeather = {} as IOurWeather;
  

  ngOnInit(): void {
    if(this.isOpenMeteo){
      //var weather = this.getWeatherOpenMeteo();
      //this.weather.temp = weather.temp;
    }else{

    }
    
  }

  getHumidityStatus(): string {   // 0-30% - suchy, 31-60% - umiarkowany, 61-100% - wilgotny
    return 'xd';
  }

  getWeatherOpenMeteo() {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=10&longitude=10&current=temperature_2m,relative_humidity_2m,rain,wind_speed_10m')
    .then(response => response.json());
  }

  getWeatherWeatherApi() {
    fetch('https://api.weatherapi.com/v1/current.json?key={key}&q={latitude},{longitude}&aqi=no')
    .then(response => response.json());
  }
}
