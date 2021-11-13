import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {DataService} from '../../services/data.service'
import { IMqttMessage, MqttService } from 'ngx-mqtt';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent implements OnInit {
  incidentTopicname = 'monitor/incident/'
  //private subscription: Subscription;

  type:string = ''
   patient:String = this.dataService.patientName
  constructor(    private router: Router,
    private dataService:DataService,
   // private _mqttService: MqttService,


    ) {
     // this.subscription = new Subscription();
     }

  ngOnInit(): void {
    console.log(' type alert  '+this.type)
   // this.subscribeIncidentTopic() 

  }
  btnClick(){
    this.router.navigateByUrl('/patient-list');


  }
  btnLogOut(){
    this.router.navigateByUrl('/signin');
  }
  incidentsBtn(){
    this.router.navigateByUrl('/incident-list');

  }
/*   subscribeIncidentTopic() {
    

    this.incidentTopicname= this.incidentTopicname+this.dataService.patientId;
    console.log('inside subscribe new topic:'+this.incidentTopicname)
    this.subscription = this._mqttService.observe(this.incidentTopicname).subscribe((message: IMqttMessage) => {
      const json = message.payload.toString()
      const obj = JSON.parse(json);
      let res: any = obj

      console.log("incident: " + res.type)
      this.type =  res.type

    });
  } */

}
