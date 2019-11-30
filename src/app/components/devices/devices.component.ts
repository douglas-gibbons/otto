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
  public editDevice: Device;
  public isNewDevice: boolean = true; // True for creating device, false for editing an old one
  public isModalActive: boolean = false;

  constructor(
    private deviceService: DeviceService,
  ) { }

  ngOnInit() {
    this.editDevice = new Device();
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

  new(component: string) {
    this.isNewDevice = true;
    this.editDevice = new Device();
    this.editDevice.name = "";
    this.editDevice.component = component;
    this.editDevice.configTopic = this.createConfigTopic(this.editDevice);
    this.isModalActive = true;

    return false;
  }

  modalCancel() {
    this.isModalActive = false;
  }
  modalSave() {
    this.save(this.editDevice);
    this.isModalActive = false;
  }
  modalChangeConfigTopic() {
    if (this.isNewDevice == true) {
      this.editDevice.configTopic = this.createConfigTopic(this.editDevice);
    }
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

  edit(device) {
    this.isNewDevice = false;
    this.editDevice = device;
    this.isModalActive = true;
  }
}
