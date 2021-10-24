import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherService } from './../app/services/weather.service';
import { HttpClientModule } from '@angular/common/http';
import { IMqttServiceOptions, MqttModule } from "ngx-mqtt";
import { environment as env } from '../environments/environment.prod';
import { MqttCliComponent } from './mqtt-cli/mqtt-cli.component'
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ResumeComponent } from './resume/resume.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RegisterComponent } from './components/register/register.component';
import { SigninComponent } from './components/signin/signin.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PatientListComponent } from './components/patient-list/patient-list.component';

export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: 'broker.emqx.io',
  port: 8083,
  path: '/mqtt'
}


@NgModule({
  declarations: [
    AppComponent,
    MqttCliComponent,
    ResumeComponent,
    RegisterComponent,
    SigninComponent,
    PatientListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS),
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule, 
    ReactiveFormsModule,
    FlexLayoutModule,
    
  ],
  providers: [
    WeatherService,
    ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
