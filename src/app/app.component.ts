import { WeatherService } from './../app/services/weather.service';
import { Chart, registerables, ChartOptions, } from 'chart.js';
import { IMqttMessage, MqttService } from 'ngx-mqtt';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { HeartData } from './../app/model/HeartData'

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
  topicname = 'casa/cocina/neverea'

  private subscription: Subscription;
  msg: any;
  heartData: any[] = [];
  datesList: any[] = [];
  isConnected: boolean = false;

  constructor(private _weather: WeatherService, private _mqttService: MqttService) {
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
    this.subscription = this._mqttService.observe(this.topicname).subscribe((message: IMqttMessage) => {
      this.msg = message;
      console.log('msg: ', message)
      // this.logMsg('Message: ' + message.payload.toString() + '<br> for topic: ' + message.topic);
      const json = message.payload.toString()
      const obj = JSON.parse(json);
      let res: any = obj
      /////////////////////////////////////////////

      console.log(res)

      let temp_max = res['list'].map((res: any) => res.temperature.temp_max)
      let temp_min = res['list'].map((res: any) => res.temperature.temp_min)
      let alldates = res['list'].map((res: any) => res.dt)


      // this.pushEventToChartData(temp_max)


      this.datesList.push(new Date().toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric' }))
      this.heartData.push(temp_max)

      console.log('size....date...' + this.datesList.length)
      console.log('size....heart...' + this.heartData.length)
      console.log('....date...' + this.datesList)
      console.log('....heart...' + this.heartData)
      let timeAxis: any[] = []

      let yAxis = this.heartData


      if (this.chart.length !== 0) {
        this.chart.destroy();
      }
      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: this.datesList,
          datasets: [
            {
              data: yAxis,
              borderColor: '#3cba9f',
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
          },
          animation: {
            duration: 0
          }
        },

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


  private pushEventToChartData(heartEvent: Object[]): void {
    if (this.isChartDataFull(this.heartData, 20)) {
      this.removeLastElementFromChartDataAndLabel();
    }
    this.heartData.push(heartEvent);
    console.log('pushEventToChartData.....' + this.heartData)
  }

  private removeLastElementFromChartDataAndLabel(): void {
    this.heartData = this.heartData.slice(1);
  }

  private isChartDataFull(chartData: Object[], limit: number): boolean {
    return chartData.length >= limit;
  }


}