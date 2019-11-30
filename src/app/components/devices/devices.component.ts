import { Component, OnInit } from '@angular/core';
import { DeviceService, Device } from '../../services/device.service'
import { deviceSettings } from '../../../environments/environment';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {

  public devices: Device[];
  public newDevice: Device;
  public isModalActive: boolean = false;

  constructor(
    private deviceService: DeviceService,
  ) { }

  ngOnInit() {
    this.newDevice = new Device();
    this.devices = this.deviceService.getDevices();
  }

  expand(device: Device) {
    device.isExpanded = !device.isExpanded
    return false;
  }

  save(device: Device) {
    this.deviceService.save(device);
    return false;
  }

  delete(device: Device) {
    this.deviceService.delete(device);
  }

  new() {
    this.newDevice = new Device();
    this.newDevice.name = "";
    this.newDevice.component = "switch";
    this.newDevice.configTopic = this.createConfigTopic(this.newDevice);
    this.isModalActive = true;

    return false;
  }

  modalCancel() {
    this.isModalActive = false;
  }
  modalSave() {
    this.save(this.newDevice);
    this.isModalActive = false;
  }
  modalChangeConfigTopic() {
    this.newDevice.configTopic = this.createConfigTopic(this.newDevice);
  }

  createConfigTopic(device: Device): string {
    let id = device.name.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
    return deviceSettings.prefix + "/" + device.component + "/" + id + "/config";
  }

  action(device) {
    if (device.isOn()) {
      this.deviceService.turnOff(device);
    } else {
      this.deviceService.turnOn(device);
    }
  }
}
