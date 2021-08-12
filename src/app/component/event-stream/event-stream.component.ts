import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IMqttMessage } from "ngx-mqtt";
import { EventMqttService } from '../../services/event.mqtt.service';

@Component({
  selector: 'app-event-stream',
  templateUrl: './event-stream.component.html',
  styleUrls: ['./event-stream.component.css']
})
export class EventStreamComponent implements OnInit {
  events: any[] =[];
  private deviceId: string ='';
  subscription: Subscription | undefined;


  constructor( private readonly eventMqtt: EventMqttService,) { }

  ngOnInit(): void {
    this.subscribeToTopic();

  }
  ngOnDestroy(): void {
    if (this.subscription) {
        this.subscription.unsubscribe();
    }
}

private subscribeToTopic() {
    this.subscription = this.eventMqtt.topic(this.deviceId)
        .subscribe((data: IMqttMessage) => {
            let item = JSON.parse(data.payload.toString());
            this.events.push(item);
        });
}
}
