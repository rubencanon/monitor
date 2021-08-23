import { WeatherService } from './../app/services/weather.service';
import { Chart, registerables, ChartOptions, } from 'chart.js';
import { IMqttMessage, MqttService } from 'ngx-mqtt';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { HeartData } from './../app/model/HeartData'
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

Chart.register(...registerables);
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'monitor'
  monitorChart: any = [];
  monitorChartSample: number=146;
  mensaje: any = '';
  topicname = 'monitor/heart'
  yLabel: number = 0
  private subscription: Subscription;
  msg: any;
  heartData: number[] = [];
  datesList: number[] = [];
  isConnected: boolean = false;

  constructor(private _weather: WeatherService, private _mqttService: MqttService) {
    this.subscription = new Subscription();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.subscribeNewTopic()
    var arr = ["orange", "mango", "banana", "sugar", "tea", "avocad6", "avocad7", "avocad8", "avocad9", "avocad10", "avocad11", "avocad12"]; 
console.log("arr.slice( 1, 2) : " + arr.slice( 1, 9) );  
console.log("arr.slice( 1, 3) : " + arr.slice( 1, 3) );
console.log("arr.slice( 8, 10) : " + arr.slice( 8, 10) );
console.log("arr.slice( 8) : " + arr.slice( 8) );
console.log("arr.slice( 1) : " + arr.slice( 1) );



  }

  subscribeNewTopic() {
    console.log('inside subscribe new topic')
    this.subscription = this._mqttService.observe(this.topicname).subscribe((message: IMqttMessage) => {
      // this.logMsg('Message: ' + message.payload.toString() + '<br> for topic: ' + message.topic);
      const json = message.payload.toString()
      const obj = JSON.parse(json);
      let res: any = obj

      console.log("received data: " + res)
      //this.datesList.push(new Date().toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric' }))

      let hr: number = res.heartRate
      let ecg: number[] = res.ecg

      if (this.monitorChart.length == 0) {
        this.monitorChart = this.initializeChart();
        this.updateConfigAsNewObject(this.monitorChart)

      } else {

        this.pushDataChart(this.monitorChart, ecg)
 
      }

    });

    this.logMsg('subscribed to topic: ' + this.topicname)
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





  private pushDataChart(chart: any, heartEvent: number[]) {
    console.log("**************************pushDataChart****************")

    console.log("addData")
    console.log('Label----------------' + chart.data.labels.length)

    chart.data.datasets.forEach((dataset: any) => {
      console.log('dataset .length----------------' + dataset.data.length);

      if (dataset.data.length >= this.monitorChartSample) {

            chart.data.labels =  chart.data.labels.slice(heartEvent.length);
           dataset.data =  dataset.data.slice(heartEvent.length)
      }



      heartEvent.forEach((eventData:number)=>{

        if (dataset.data.length > this.monitorChartSample) {
          console.log('dataset .length>'+ this.monitorChartSample);
  
           // chart.data.labels =  chart.data.labels.slice(1);
           // dataset.data =  dataset.data.slice(1)
  
        }
        dataset.data.push(eventData);
        chart.data.labels.push(9);

      })
    });

    chart.update();
  }
 


    
  private initializeChart(): any {
    console.log("*********************initializeChart***************")
    // this.logMsg('Message: ' + message.payload.toString() + '<br> for topic: ' + message.topic);
    /////////////////////////////////////////////

    let emptyLabels: any=[]
    let emptyData: any=[]
/*
    for(var i = 0; i < this.monitorChartSample; i++){
      emptyLabels.push(0)
      emptyData.push(0)
    }
*/
    const options = {
      scales: {
        y: {
          //suggestedMin: 100,
         // suggestedMax: 100,
           max: 10,
            min: -10,
          //stepSize: 20


        }
      },
      animation: {
        duration: 5
      }
    };
    const data = {
      labels: emptyLabels,
      datasets: [
        {
          data: emptyData,
          borderColor: '#1F1009',
          //  fill: true
        },

      ]
    };


    return new Chart('monitor', {
      type: 'line',
      data: data,
      options: options,

    })

  }
  private updateConfigAsNewObject(chart: any) {
    console.log("******** updateConfigAsNewObject ")
    chart.options = {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Grafica ECG-HR '
        }
      },
      scales: {
        x: {
          display: false // hide labels
        },
        y: {
          display: true
        }
      }
    };
    chart.update();

  }
  private updateConfigByMutating(chart: any) {
    chart.options.plugins.title.text = 'Mutatin Grafica ECG-HR ';
    chart.update();
  }
 
  private updateData(chart: any) {
    console.log("updateData")
    chart.data = {
      labels: this.datesList,
      datasets: [
        {
          data: this.heartData,
          borderColor: '#1F1009',
          //  fill: true
        },

      ]
    };


    chart.update();

  }

  private addData(chart: any, label: any, data: any) {

    console.log("*************addData")
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset: any) => {
      dataset.data.push(data);
    });
    chart.update();
  }

  private removeData(chart: any) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset: any) => {
      dataset.data.pop();
    });
    chart.update();
  }

}