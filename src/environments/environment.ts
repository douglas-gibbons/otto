// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { IMqttServiceOptions } from 'ngx-mqtt';
import { Guid } from "guid-typescript";

// import jsonDevices from './devices.json';

export const environment = {
  production: false,
};

export const mqttServiceOptions: IMqttServiceOptions = {
  connectOnCreate: false,
  clean: true,
}

// MQTT Settings
let port = localStorage.getItem('mqtt.port') || 15675;
type Protocol = 'wss'|'ws'

export const mqttSettings: IMqttServiceOptions = {
  hostname: localStorage.getItem('mqtt.hostname') || document.location.hostname,
  port: Number(port),
  path: localStorage.getItem('mqtt.path') || '/ws',
  username: localStorage.getItem('mqtt.username') || "user",
  password: localStorage.getItem('mqtt.password') || "password",
  clientId: Guid.raw(),
  protocol:  localStorage.getItem('mqtt.protocol') as Protocol || 'wss',
  reconnectPeriod: 500,
  connectTimeout: 10000
};

export const deviceSettings = {
  prefix: localStorage.getItem('device.prefix') || 'homeassistant',
};
