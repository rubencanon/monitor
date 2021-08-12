import { Component } from '@angular/core';
import { WeatherService } from './weather.service';
import { Chart,registerables } from 'chart.js';
Chart.register(...registerables);
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'monitor'
  chart: any = [];

  constructor(private _weather: WeatherService) { }

  ngOnInit() {
    this._weather.dailyForecast()
      .subscribe((res: any) => {

      
        let temp_max = res['list'].map((res: any) => res.main.temp_max)

        let temp_min = res['list'].map((res: any) => res.main.temp_min)
        let alldates = res['list'].map((res: any) => res.dt)

        let weatherDates: any[] = []
        alldates.forEach((res: any) => {
          let jsdate = new Date(res * 1000)
          weatherDates.push(jsdate.toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric' }))
        })

        this.chart = new Chart('canvas', {
          type: 'line',
          data: {
            labels: weatherDates,
            datasets: [
              {
                data: temp_max,
                borderColor: '#3cba9f',
                fill: false
              },
              {
                data: temp_min,
                borderColor: '#ffcc00',
                fill: false
              },
            ]
          },
          options: {
            scales: {
              y: {
                suggestedMin: 50,
                suggestedMax: 100
              }
            }
          }
        })

      })
  }
}