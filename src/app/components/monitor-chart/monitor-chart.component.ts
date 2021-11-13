import { Chart,  ChartOptions, } from 'chart.js';
import { IMqttMessage, MqttService } from 'ngx-mqtt';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import {DataService} from '../../services/data.service'

@Component({
  selector: 'app-monitor-chart',
  templateUrl: './monitor-chart.component.html',
  styleUrls: ['./monitor-chart.component.css']
})
export class MonitorChartComponent  implements OnInit, OnDestroy {

  title = 'monitor'
  monitorChart: any = [];
  monitorChartSample: number = 250;
  mensaje: any = '';
  topicname = 'monitor/heart/'

  yLabel: number = 0
  private subscription: Subscription;
  msg: any;
  heartData: number[] = [];
  datesList: number[] = [];
  isConnected: boolean = false;

  constructor(
    private _mqttService: MqttService,
    private dataService:DataService
    )
  {
    this.subscription = new Subscription();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.subscribeMOnitorTopic()
    this.monitorChart = this.initializeChart();

  }

  subscribeMOnitorTopic() {
    this.topicname= this.topicname+this.dataService.patientId;
    console.log('inside subscribe new topic:'+this.topicname)
    this.subscription = this._mqttService.observe(this.topicname).subscribe((message: IMqttMessage) => {
      const json = message.payload.toString()
      const obj = JSON.parse(json);
      let res: any = obj

      console.log("received data: " + res)

      let hr: number = res.heartRate
      let ecg: number[] = res.ecg

      if (this.monitorChart.length == 0) {
        this.monitorChart = this.initializeChart();
      //  this.updateConfigAsNewObject(this.monitorChart)

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

    console.log('Label----------------' + chart.data.labels.length)

    chart.data.datasets.forEach((dataset: any) => {
      console.log('dataset .length----------------' + dataset.data.length);
      console.log("heartEvent.length"+heartEvent.length)
      heartEvent.forEach((eventData: number) => {

        if (dataset.data.length > this.monitorChartSample) {
          console.log('dataset .length>' + this.monitorChartSample);

          chart.data.labels.shift();
          chart.data.datasets[0].data.shift()

        }
        dataset.data.push(eventData/200);
        chart.data.labels.push(1);

      })
      chart.update();

    }
    );

    /*
    if (chart.data.datasets[0].data.length > this.monitorChartSample) {

      for (var i = 0; i < 50; i++) {
        chart.data.labels.shift();
        chart.data.datasets[0].data.shift()

      }
    }
    */
  
  }




  private initializeChart(): any {
    console.log("*********************initializeChart***************")
    // this.logMsg('Message: ' + message.payload.toString() + '<br> for topic: ' + message.topic);
    /////////////////////////////////////////////

    let emptyLabels: any = []
    let emptyData: any = []
/*
    for (var i = 0; i < this.monitorChartSample; i++) {
      emptyLabels.push(0)
      emptyData.push(0)
    }
*/
    const options = {
      plugins: {
        title: {
          display: true,
          text: 'Grafica ECG '
        },
        legend: {
          display: false,
          labels: {
              color: 'rgb(255, 99, 132)',
              text: 'ECG'

          }
      }
      },
      scales: {
        
        y: {
          //suggestedMin: 100,
          // suggestedMax: 100,
          max: 6,
          min: -6,
          //stepSize: 20
          labelString: '[mV]',
          legend: {
            enabled: true
        },

        },
        x:{
         // max: 1000,
         display: false, // hide labels
         labelString: 'tiempo [ms]',
          min: 0,
        }
      },
      animation: {
        duration: 60
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
          display: false, // hide labels
          scaleOverride : true,
          scaleSteps : 10,
          scaleStepWidth : 30,
          scaleStartValue : 0 ,
          labelString: 'probability',

          ticks: {
            stepSize: 0.5
          }
        },
        y: {
          display: true,
          scaleOverride : true,
          scaleSteps : 10,
          scaleStepWidth : 30,
          scaleStartValue : 0 ,
          labelString: 'probability',

          ticks: {
            stepSize: 1
        }
        }
      }
    };
    chart.update();

  }
  private updateConfigByMutating(chart: any) {
    chart.options.plugins.title.text = 'Mutating Grafica ECG-HR ';
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