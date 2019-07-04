import { Component, OnDestroy } from '@angular/core';
import { DeviceService } from '../../services/device.service'
import { IMqttMessage } from 'ngx-mqtt';
import { MessageService, Level } from '../../services/message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent implements OnDestroy {

  topic: string = localStorage.getItem('subscribe.topic') || "";
  messages: IMqttMessage[] = []
  currentSubscription: Subscription;

  constructor(
    private deviceService: DeviceService,
    private messageService: MessageService,
  ) { }

  ngOnDestroy() {
    if (this.currentSubscription) {
      this.currentSubscription.unsubscribe();
    }
  }

  subscribe() {
    this.messages = [];
    localStorage.setItem('subscribe.topic', this.topic);

    if (this.currentSubscription) {
      this.currentSubscription.unsubscribe();
    }

    this.currentSubscription = this.deviceService.observe(this.topic).subscribe(
      message => this.messages.push(message),
      e => this.messageService.message(Level.Warning, e.message)
    )
    this.messageService.temporaryMessage(Level.Success, "Subscribed");
    return false;
  }
}
