import { Component, OnInit } from '@angular/core';
import { DeviceService, Device } from '../../services/device.service'

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {

  public devices: Device[];

  constructor(
    private deviceService: DeviceService,
  ) { }

  ngOnInit() {
    this.devices = this.deviceService.getDevices();
  }

}
