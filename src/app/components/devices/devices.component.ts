import { Component, OnInit } from '@angular/core';
import { DeviceService, Device } from '../../services/device.service'
import { deviceSettings } from '../../../environments/environment';
import { MessageService, Level } from '../../services/message.service';

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
    private messageService: MessageService,
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

  new(component: string) {
    this.isNewDevice = true;
    this.editDevice = new Device();
    this.editDevice.name = "";
    this.editDevice.component = component;
    this.editDevice.configTopic = this.createConfigTopic(this.editDevice);
    this.isModalActive = true;

    return false;
  }

  cancelDelete(device) {
    device.isDeleting = false;
    this.messageService.temporaryMessage(Level.Info, "Deletion cancelled");
  }
  modalDelete(device) {
    this.isModalActive = false;
    device.isDeleting = true;

    setTimeout(() => {
      // Did we cancel the delete
      if (device.isDeleting != false) {
        this.deviceService.delete(device);
      }
    }, 5000);

  }
  modalCancel() {
    this.isModalActive = false;
  }
  modalSave(device) {
    this.save(device);
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
