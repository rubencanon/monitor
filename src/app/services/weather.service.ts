import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { map, filter, switchMap } from 'rxjs/operators';
import { pipe } from 'rxjs/';
import 'rxjs/add/operator/map'
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
//import data from './weather.json';
import { Subscription } from 'rxjs';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { IMqttMessage, MqttService } from 'ngx-mqtt';

@Injectable({
  providedIn: 'root'
})
export class WeatherService implements OnInit, OnDestroy {
  private subscription: Subscription;
  topicname: any;
  msg: any;
  isConnected: boolean = false;
  @ViewChild('msglog', { static: true }) msglog: ElementRef;
  url = "http://samples.openweathermap.org/data/2.5/history/city?q=Warren,OH&appid=b6907d289e10d714a6e88b30761fae22";

  constructor(private _http: HttpClient, private _mqttService: MqttService) {
    this.msglog = new ElementRef<any>('');
    this.subscription = new Subscription();
  }

  dailyForecast() {
    const result = [];
    // return this._http.get(this.url)
    // .map((result:any) => result);


    return this._http.get('http://localhost:4200/assets/weather.json')
      .map((result: any) => {
        const json = "{    \"list\": [        {            \"main\": {                \"temp_min\": 900.946,                \"temp_max\": 279.946            }        }           ]}";
        const obj = JSON.parse(json);
        return result;
      });

    //   return this._http.get('/your.json').subscribe(data => (result);
  }


  ngOnInit(): void {
    console.log('****************Weather service***************')

    this.subscribeNewTopic()
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  subscribeNewTopic() {
    console.log('inside subscribe new topic')
    if (this.topicname == null) {
      this.topicname = 'casa/cocina/neverea'
    }
    this.subscription = this._mqttService.observe(this.topicname).subscribe((message: IMqttMessage) => {
      this.msg = message;
      console.log('msg: ', message)
      this.logMsg('Message: ' + message.payload.toString() + '<br> for topic: ' + message.topic);
    });
    this.logMsg('subscribed to topic: ' + this.topicname)
    return this.subscription
  }

  sendmsg(): void {
    // use unsafe publish for non-ssl websockets
    this._mqttService.unsafePublish(this.topicname, this.msg, { qos: 1, retain: true })
    this.msg = ''
  }

  logMsg(message: any): void {
    this.msglog.nativeElement.innerHTML += '<b><br><hr>' + message;
  }

  clear(): void {
    this.msglog.nativeElement.innerHTML = '';
  }




}


