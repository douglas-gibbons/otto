import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { MqttService, IMqttMessage, MqttConnectionState } from 'ngx-mqtt';
import { mqttSettings, deviceSettings } from '../../environments/environment';
import { MessageService, Level } from './message.service';

export class Device {
  constructor() { }
  public name: string;
  public configTopic: string;
  public stateTopic: string;
  public commandTopic: string;
  public unitOfMeasurement: string;
  public jsonPath: string; // Json path to required measurement
  public state: string;
  public isLoading: boolean = false;
  public isExpanded : boolean = false; // Viewing devices in devices component
  public component: string; // device type; switch or sensor
  public rawState: string // Device state message (not value of json path)
  public isOn() {
    return this.state == "ON";
  }

}

@Injectable({
  providedIn: 'root',
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
      this.messageService.message(Level.Danger, e);
    }
  }

  private monitorMqttStatus() {
    this.mqttService.onError.subscribe(
      event => {
        this.messageService.message(Level.Warning, "MQTT connection failure");
      }
    );
    this.mqttService.onConnect.subscribe(
      () => {
        this.messageService.clear();
        this.messageService.message(Level.Info, "Connected to MQTT broker")
        this.subscribeDevices();
      });

    this.mqttService.onOffline.subscribe(
      () => {
        this.messageService.message(Level.Warning, "MQTT connection failure (offline)")
        this.subscribeDevices();
      });
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
      let payloadString = message.payload.toString()
      if (payloadString == "")
        return;

      let payload = JSON.parse(payloadString);
      let device = new Device();
      device.name = payload.name;
      device.configTopic = message.topic.toString();
      device.stateTopic = payload.state_topic;
      device.commandTopic = payload.command_topic;
      device.unitOfMeasurement = payload.unit_of_measurement;
      device.jsonPath = payload.json_path;
      device.component = message.topic.toString().split('/')[1];
      this.pushDevice(device);
      this.subscribeDevice(device);

    });
    this.subscriptions.push(subs);
  }

  // Adds a device to the list of devices, replacing it if it's already in the array
  private pushDevice(device) {
    for (let i = 0; i < this.devices.length; i++) {
      if (this.devices[i].configTopic == device.configTopic) {
        device.isExpanded = this.devices[i].isExpanded; // Retain expanded information
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
          device.rawState = message.payload.toString();
          device.state = device.rawState;
          if (this.isJson(device.state) && device.jsonPath) {
            device.state = this.fromJsonPath(device.jsonPath, device.state);
          }
          device.isLoading = false;
        },
        e => {
          this.messageService.message(Level.Warning, e.message);
        }
      );
      this.subscriptions.push(subs);
    }
  }

  // Get reading from a json path, represented as a string
  private fromJsonPath(path: string, text: string): string {
    let obj = JSON.parse(text)

    let keys = path.split('.');
    for (let key of keys) {

      // Failed to find the key
      if (!(key in obj)) {
        this.messageService.message(Level.Warning, "Could not find value for key '" + key + "' in payload");
        return "?";
      }

      obj = obj[key]
    }
    return obj;
  }

  // Check if given text is a JSON object
  private isJson(text: string): boolean {
    try {
      text = JSON.parse(text);
    } catch (e) {
      return false;
    }
    if (typeof text === "object" && text !== null) {
      return true;
    }
    return false;
  }

  public publish(topic: string, message: string, retain: boolean): Observable<void> {
    return this.mqttService.publish(topic, message, { qos: 1, retain: retain });
  }

  public observe(topic: string): Observable<IMqttMessage> {
    return this.mqttService.observeRetained(topic);
  }
  public turnOff(device) {
    device.isLoading = true;
    this.publish(device.commandTopic, "OFF", false).subscribe();

  }
  public turnOn(device) {
    device.isLoading = true;
    this.publish(device.commandTopic, "ON", false).subscribe();
  }

  public save(device) {
    this.publish(device.configTopic, this.deviceToJson(device), true).subscribe(
      () => this.messageService.temporaryMessage(Level.Info, "Saved \"" + device.name + "\"")
    );
  }
  public delete(device) {
    // Sending a retained message with an empty message deletes that message
    this.publish(device.configTopic, "", true).subscribe(
      () => this.messageService.temporaryMessage(Level.Info, "Deleted \"" + device.name + "\"")
    );

    // Remove device from list of devices
    for (let i = 0; i < this.devices.length; i++) {
      if (this.devices[i].configTopic == device.configTopic) {
        this.devices.splice(i,1);
        return
      }
    }

  }

  private deviceToJson(device): string {
    return JSON.stringify({
      name: device.name,
      state_topic: device.stateTopic,
      command_topic: device.commandTopic,
      unit_of_measurement: device.unitOfMeasurement,
      json_path: device.jsonPath,
    });
  }

}
