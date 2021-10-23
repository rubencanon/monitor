import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherService } from './../app/services/weather.service';
import { HttpClientModule } from '@angular/common/http';
import { IMqttServiceOptions, MqttModule } from "ngx-mqtt";
import { environment as env } from '../environments/environment.prod';
import { MqttCliComponent } from './mqtt-cli/mqtt-cli.component'
import { FormsModule } from "@angular/forms";
import { LogInComponent } from './log-in/log-in.component';
import { ResumeComponent } from './resume/resume.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: 'broker.emqx.io',
  port: 8083,
  path: '/mqtt'
}


@NgModule({
  declarations: [
    AppComponent,
    MqttCliComponent,
    LogInComponent,
    ResumeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS),
    FormsModule,
    BrowserAnimationsModule,

    
  ],
  providers: [
    WeatherService,
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
