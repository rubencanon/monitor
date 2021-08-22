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

      console.log(res)
      //this.datesList.push(new Date().toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric' }))

      let hr: number = res.heartRate
      let ecg: number = res.ecg

        if (this.monitorChart.length == 0) {
          this.monitorChart=  this.initialize();
          this.updateConfigAsNewObject(this.monitorChart)

      }else{
        this.addData(this.monitorChart,67,89)
      }

      //this.buildChart(hr, ecg)
     // this.updateConfigByMutating(this.monitorChart)

     // this.addData(this.monitorChart,67,89)
      
     // this.buildChart(19, 90);
      //this.updateData(this.monitorChart)
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


  private pushEventToChartData(heartEvent: number): void {
    console.log("**************************pushEventToChartData****************")
    if (this.isChartDataFull(this.heartData, 20)) {
      this.removeLastElementFromChartDataAndLabel();
    }
    this.heartData.push(heartEvent);
    this.datesList.push(this.yLabel++)
    console.log('pushEventToChartData.....' + this.heartData)
  }

  private removeLastElementFromChartDataAndLabel(): void {
    this.heartData = this.heartData.slice(1);
    this.datesList = this.datesList.slice(1);

  }

  private isChartDataFull(chartData: number[], limit: number): boolean {
    return chartData.length >= limit;
  }

  private updateConfigByMutating(chart: any) {
    chart.options.plugins.title.text = 'Mutatin Grafica ECG-HR ';
    chart.update();
  }
  private updateConfigAsNewObject(chart: any) {
    console.log("*********************** updateConfigAsNewObject ")
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
          display: true
        },
        y: {
          display: true
        }
      }
    };
    chart.update();
    console.log("*********************** updateConfigAsNewObject ")

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



  private initializeChart(chart: any) {
    const data = {
      labels: this.datesList,
      datasets: [
        {
          data: this.heartData,
          borderColor: '#1F1009',
          //  fill: true
        },

      ]
    };

    const options = {
      scales: {
        y: {
          suggestedMin: 100,
          suggestedMax: 100
        }
      },
      animation: {
        duration: 0
      }
    };

    chart = new Chart('monitor', {
      type: 'line',
      data: data,
      options: options,

    })
  }

  private buildChart(hr: number, ecg: number) {
    console.log("*********************buildChart****************")
    // this.logMsg('Message: ' + message.payload.toString() + '<br> for topic: ' + message.topic);
    /////////////////////////////////////////////
    const options = {
      scales: {
        y: {
          suggestedMin: 100,
          suggestedMax: 100
        }
      },
      animation: {
        duration: 0
      }
    };
    const data = {
      labels: this.datesList,
      datasets: [
        {
          data: this.heartData,
          borderColor: '#1F1009',
          //  fill: true
        },

      ]
    };

    //this.datesList.push(new Date().toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric' }))

    this.datesList.push(this.yLabel++)
    this.pushEventToChartData(ecg)
    console.log('....heart...' + this.heartData)
    if (this.monitorChart.length !== 0) {
      this.monitorChart.destroy();
    }

    this.monitorChart = new Chart('monitor', {
      type: 'line',
      data: data,
      options: options,

    })

  }

  private addData(chart:any, label:any, data:any) {

    console.log("addData")
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset:any) => {
        dataset.data.push(data);
    });
    chart.update();
}

private removeData(chart:any) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset:any) => {
        dataset.data.pop();
    });
    chart.update();
}

private initialize():any{
  console.log("*********************initialize***************")
  // this.logMsg('Message: ' + message.payload.toString() + '<br> for topic: ' + message.topic);
  /////////////////////////////////////////////
  const options = {
    scales: {
      y: {
        suggestedMin: 100,
        suggestedMax: 100
      }
    },
    animation: {
      duration: 0
    }
  };
  const data = {
   // labels: [],
    datasets: [
      {
        data: [],
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

}