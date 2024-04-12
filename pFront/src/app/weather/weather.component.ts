import { Component, Input } from '@angular/core';
import { IOurWeather } from '../../model/iour-weather';
import { IOpenMeto } from '../../model/iopen-meto';
import { Degree } from '../../model/degree';
import { SpeedUnit } from '../../model/speed-unit';
import { ICoordinates } from '../../model/icoordinates';
import { ICity } from '../../model/icity';

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
  @Input() listofcities:ICity[] =[]; //z bazy danych



  weather: IOurWeather = {
    temp: 0,
    humidity: 0,
    rainChance: 0,
    windSpeed: "0"
  } as IOurWeather;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getWeatherOpenMeteo({
      name: 'Warszawa',
      latitude: 52.22977,
      longtitude: 21.01178
    })
  }

  setWeather(idx : number) {
    var myweather;

    if(this.isOpenMeteo){
      var openWeather :IOpenMeto = this.getWeatherOpenMeteo(this.listofcities[idx]);
      this.weather.temp = openWeather.current.temperature_2m;
      this.weather.humidity = openWeather.current.relative_humidity_2m;
      this.weather.rainChance = openWeather.current.rain;
      this.weather.windSpeed = openWeather.current.wind_speed_10m.toString();
    }else{
      this.getWeatherWeatherApi('key', this.listofcities[idx])


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

  getWeatherOpenMeteo(city: ICity) {
    const url = 'https://api.open-meteo.com/v1/forecast?latitude='+city.latitude+'&longitude='+city.longtitude+'&current=temperature_2m,relative_humidity_2m,rain,wind_speed_10m/weather';
    var myweather:IOpenMeto ={} as IOpenMeto;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        // this.weather.temp = data.current.temperature_2m;
        // this.weather.humidity = data.current.relative_humidity_2m;
        // this.weather.rainChance = data.current.rain;
        // this.weather.windSpeed = data.current.wind_speed_10m;
        myweather = data;
      });
      return myweather;
  } 

    getWeatherWeatherApi(key: String, city: ICity){
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
