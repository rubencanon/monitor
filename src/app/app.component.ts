import { WeatherService } from './../app/services/weather.service';
import { Chart, registerables } from 'chart.js';
import { IMqttMessage, MqttService } from 'ngx-mqtt';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

Chart.register(...registerables);
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'monitor'
  chart: any = [];
  mensaje: any = '';

  private subscription: Subscription;
  topicname: any;
  msg: any;
  isConnected: boolean = false;
  @ViewChild('msglog', { static: true }) msglog: ElementRef;
  constructor(private _weather: WeatherService, private _mqttService: MqttService) {

    this.msglog = new ElementRef<any>('');
    this.subscription = new Subscription();
  }




  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    console.log('+++++++++++++++++++++++++++++++*********************')
    this.subscribeNewTopic()
  }

  subscribeNewTopic() {
    console.log('inside subscribe new topic')
    if (this.topicname == null) {
      this.topicname = 'casa/cocina/neverea'
    }
    this.subscription = this._mqttService.observe(this.topicname).subscribe((message: IMqttMessage) => {
      this.msg = message;
      console.log('msg: ', message)
     // this.logMsg('Message: ' + message.payload.toString() + '<br> for topic: ' + message.topic);
     const json = message.payload.toString()
     const obj = JSON.parse(json);
      let res: any = obj
      /////////////////////////////////////////////

      console.log(res)

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

      ///////////////////////////////////////////



    });
    this.logMsg('subscribed to topic: ' + this.topicname)
    return this.msg
  }

  sendmsg(): void {
    // use unsafe publish for non-ssl websockets
    this._mqttService.unsafePublish(this.topicname, this.msg, { qos: 1, retain: true })
    this.msg = ''
  }

  logMsg(message: any): void {
   // this.msglog.nativeElement.innerHTML += '<b><br><hr>' + message;
   console.log(message)
  }

  clear(): void {
   // this.msglog.nativeElement.innerHTML = '';
  }

  graficar() {
    this._weather.dailyForecast()
      .subscribe((res: any) => {

        console.log(res)

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

      }

      )
  }

}