import { Component } from '@angular/core';
import { mqttSettings, deviceSettings } from '../../../environments/environment';
import { MqttService, IMqttMessage } from 'ngx-mqtt';
import { DeviceService } from '../../services/device.service'

@Component({
  selector: 'app-identity',
  templateUrl: './identity.component.html',
  styleUrls: ['./identity.component.scss']
})
export class IdentityComponent {

  mqttSettings = mqttSettings;
  deviceSettings = deviceSettings;
  protocols = [
    'wss', 'ws'
  ];

  constructor(
    private mqttService: MqttService,
    private deviceService: DeviceService,
  ) { }

  saveSetting(fieldName: string) {
    localStorage.setItem('mqtt.' + fieldName, mqttSettings[fieldName]);
  }

  saveDeviceSetting(fieldName) {
    localStorage.setItem('device.' + fieldName, deviceSettings[fieldName]);
  }

  refresh() {
    this.deviceService.refresh();
    return false;
  }
}
