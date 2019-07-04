import { Component, OnInit } from '@angular/core';
import { MqttService } from 'ngx-mqtt';
import { Level, MessageService } from '../../services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})

export class MessagesComponent implements OnInit {

  constructor(
    private mqttService: MqttService,
    private messageService: MessageService,
  ) { }

  ngOnInit() {

  }

}
