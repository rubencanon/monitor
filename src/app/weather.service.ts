import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { map, filter, switchMap } from 'rxjs/operators';
import { pipe } from 'rxjs/';
import 'rxjs/add/operator/map'
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
//import data from './weather.json';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  url = "http://samples.openweathermap.org/data/2.5/history/city?q=Warren,OH&appid=b6907d289e10d714a6e88b30761fae22";

  constructor(private _http: HttpClient) {

  }

  dailyForecast() {
    const result = [];
    // return this._http.get(this.url)
    // .map((result:any) => result);

    for (let i = 0; i < 100; i++) {
    } 
    return this._http.get('http://localhost:4200/assets/weather.json')
      .map((result: any) => {
        const json = "{    \"list\": [        {            \"main\": {                \"temp_min\": 900.946,                \"temp_max\": 279.946            }        }           ]}";
        const obj = JSON.parse(json);
        return obj;
      });

    //   return this._http.get('/your.json').subscribe(data => (result);
  }

}


