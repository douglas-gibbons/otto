import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../../services/device.service'
import { MessageService, Level } from '../../services/message.service';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.css']
})
export class PublishComponent implements OnInit {

  // Set values from local storage
  retain: boolean = localStorage.getItem('publish.retain') && localStorage.getItem('publish.retain') == "true" || false;
  payload: string = localStorage.getItem('publish.payload') || "";
  topic: string = localStorage.getItem('publish.topic') || "";

  constructor(
    private deviceService: DeviceService,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    localStorage.setItem('publish.topic', this.topic);
    localStorage.setItem('publish.payload', this.payload);
    localStorage.setItem('publish.retain', this.retain.toString());
  }

  publish() {

    localStorage.setItem('publish.topic', this.topic);
    localStorage.setItem('publish.payload', this.payload);
    localStorage.setItem('publish.retain', this.retain.toString());

    this.deviceService.publish(this.topic, this.payload, this.retain).subscribe(
      () => this.messageService.temporaryMessage(Level.Success, "Published"),
      err => this.messageService.message(Level.Warning, "MQTT publish error: " + err)
    );
    return false;
  }
}
