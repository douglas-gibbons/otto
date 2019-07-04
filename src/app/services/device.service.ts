import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { MqttService, IMqttMessage, MqttConnectionState } from 'ngx-mqtt';
import { mqttSettings, deviceSettings } from '../../environments/environment';
import { MessageService, Message, Level } from './message.service';

export class Device {
  constructor() { }
  public name: string;
  public object: string;
  public type: string;
  public configTopic: string;
  public stateTopic: string;
  public commandTopic: string;
  public unitOfMeasurement: string;
  public state: string;
  public isLoading: boolean = false;

  public isOn() {
    return this.state == "ON";
  }

}

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  private devices: Device[] = [];
  private subscriptions: Subscription[] = [];

  constructor(
    private http: HttpClient,
    private mqttService: MqttService,
    private messageService: MessageService,
  ) {

    try {
      this.mqttService.connect(mqttSettings);
      this.monitorMqttStatus();
    } catch (e) {
      this.message(Level.Danger, e);
    }

  }

  private monitorMqttStatus() {
    this.mqttService.onError.subscribe(
      event => {
        this.message(Level.Warning, "MQTT connection failure");
      }
    );
    this.mqttService.onConnect.subscribe(
      () => {
        this.messageService.clear();
        this.message(Level.Info, "Connected to MQTT broker")
        this.subscribeDevices();
      });

    this.mqttService.onOffline.subscribe(
      () => {
        this.message(Level.Warning, "MQTT connection failure (offline)")
        this.subscribeDevices();
      });
  }

  private message(level: Level, text: string) {
    this.messageService.add(
      new Message(level, text)
    )
  }

  // Refresh connection
  public refresh() {
    this.devices.length = 0;
    this.messageService.clear();
    // mqttService.connect disconnects if it is already connected
    this.mqttService.connect(mqttSettings);
  }

  public getDevices() {
    return this.devices;
  }

  // Run whenever a connection is established
  private subscribeDevices(): void {

    // Remove any previous device subscriptions
    for (let subs of this.subscriptions) {
      subs.unsubscribe();
    }
    this.subscriptions = [];

    let configTopic = deviceSettings.prefix + '/+/+/config';
    let subs = this.mqttService.observeRetained(configTopic).subscribe((message: IMqttMessage) => {

      let discoveryTopic = message.topic.split('/');
      let prefix = discoveryTopic[0];
      let component = discoveryTopic[1];
      let object = discoveryTopic[2];
      let payload = JSON.parse(message.payload.toString());

      let device = new Device();
      device.type = component;
      device.object = object;
      device.name = payload.name;
      device.stateTopic = payload.state_topic;
      device.commandTopic = payload.command_topic;
      device.unitOfMeasurement = payload.unit_of_measurement;

      this.pushDevice(device);
      this.subscribeDevice(device);

    });
    this.subscriptions.push(subs);
  }

  // Adds a device to the list of devices, replacing it if it's already in the array
  private pushDevice(device) {
    for (let i = 0; i < this.devices.length; i++) {
      if (this.devices[i].stateTopic == device.stateTopic) {
        this.devices[i] = device;
        return
      }
    }
    this.devices.push(device);
  }

  private subscribeDevice(device: Device): void {
    if (device.stateTopic != undefined) {
      let subs = this.mqttService.observeRetained(device.stateTopic).subscribe(
        (message: IMqttMessage) => {
          device.state = message.payload.toString();
          device.isLoading = false;
        },
        e => {
          this.message(Level.Warning, e.message);
        }
      );
      this.subscriptions.push(subs);
    }
  }

  public publish(topic: string, message: string, retain: boolean): void {
    this.mqttService.unsafePublish(topic, message, { qos: 1, retain: retain });
  }

  public turnOff(device) {
    device.isLoading = true;
    this.publish(device.commandTopic, "OFF", false);

  }
  public turnOn(device) {
    device.isLoading = true;
    this.publish(device.commandTopic, "ON", false);
  }

}
