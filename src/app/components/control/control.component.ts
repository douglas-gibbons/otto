import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { DeviceService, Device } from '../../services/device.service'

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit {

  private devices: Device[];

  constructor(
    private deviceService: DeviceService,
  ) { }

  ngOnInit() {
    this.devices = this.deviceService.getDevices();
  }

  action(device) {
    if (device.isOn()) {
      this.deviceService.turnOff(device);
    } else {
      this.deviceService.turnOn(device);
    }
  }

}
