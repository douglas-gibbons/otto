The Sonoff Pow R2 not only acts as a power switch, but can also monitor power consumption. This is an example of how to set it up with ʘttʘ, to monitoring power consumption for a car charging point.

<img src="/assets/docs/images/car-charge.jpg" width="200" />

#### Prerequisites

* ʘttʘ controls devices using MQTT over websockets, so you'll need an [MQTT broker with secure websockets enabled](http://www.steves-internet-guide.com/mqtt-websockets/).
* The Sonoff Pow R2, should be correctly wired in between the mains power and the charger unit
* The device should be flashed with [Tasmota](https://github.com/arendst/Sonoff-Tasmota/wiki/Flashing) firmware
* [Wi-Fi access](https://github.com/arendst/Sonoff-Tasmota/wiki/Initial-Configuration#configure-wi-fi) should be configured
* There is usually no need to install ʘttʘ itself, as it is freely available at [otto.zenly.xyz](https://otto.zenly.xyz/).

<img src="/assets/docs/images/sonoff-pow2.jpg" width="200" />


### Setting Up The Device

#### MQTT

1. From the device's web page, click on "Configuration" and then "Configure MQTT"
1. Set up the Host, Port, Client, User and Password of your MQTT broker
1. Change "Topic" to be a unique device name. For example "charger", in this case
1. Click "save" and let the device restart

#### Module Type Configuration

On the Tasmota web interface select "Configuration Module" and set the module type to "Sonoff Pow R2"

#### Console Options

Click on "Console", type in the following two lines (press [enter] after each line).

```
PowerRetain 1
SensorRetain 1
```

I also set the clock to my local time and set daylight saving time. This is for my timezone in California. Yours may well be different (see [time settings](https://github.com/arendst/Sonoff-Tasmota/wiki/Commands#timestd)).

```
TIMEDST 0,2,3,1,2,-420
TIMESTD 0,1,11,1,2,-480
```

The Sonoff Pow R2 should now be publishing messages to your MQTT broker.

### Setting ʘttʘ

#### MQTT Broker Configuration

First configure ʘttʘ to access your MQTT broker. Enter your settings on the [configuration page](https://otto.zenly.xyz/identity). The settings will be saved in your browser's local storage.

The "Discovery Prefix" box is the first part of the configuration message topic that you'll use. It's what ʘttʘ uses to find it's configuration messages.  In this case; we're set it to "ʘttʘ".

Press "Connect" and make sure that you can connect to your MQTT broker.

#### Device Configuration Messages

Now that you're connected to your broker, publish some messages to let ʘttʘ discover your device. The [publish screen](https://otto.zenly.xyz/publish) in ʘttʘ can be used for this.

Publish the following messages making sure that you __enable "retain"__ to store the messages.

This message tells ʘttʘ that you have a switch, that can be controlled by the topic "cmnd/charger/POWER". Note, that your state and command topics in the configuration will be different if you did not name your device "charger". You can see messages published in the console window of your device to check.

* Topic: `otto/switch/charger/config`
* Payload:

```
{  
  "name": "car charger",
  "state_topic": "stat/charger/POWER",
  "command_topic": "cmnd/charger/POWER"
}
```

The following three messages should also be published to tell ʘttʘ that the device is also a sensor with several readings that we're interested in:

The current:

* Topic: `otto/sensor/charger_current/config`
* Payload:
```
{
  "name": "Charger current",
  "state_topic": "tele/charger/SENSOR",
  "unit_of_measurement": "A",
  "json_path": "ENERGY.Current"
}
```

Total power usage from yesterday (this is why it is important to set the clock to the correct timezone):

* Topic: `otto/sensor/charger_yesterday/config`
* Payload:
```
{
  "name": "Charger energy usage yesterday",
  "state_topic": "tele/charger/SENSOR",
  "unit_of_measurement": "kWh",
  "json_path": "ENERGY.Yesterday"
}
```

Total power usate so far today:

* Topic: `otto/sensor/charger_today/config`
* Payload:
```
{
  "name": "Charger energy usage today",
  "state_topic": "tele/charger/SENSOR",
  "unit_of_measurement": "kWh",
  "json_path": "ENERGY.Today"
}
```

If all goes to plan, you should now be able to visit the [control](https://otto.zenly.xyz/control) page of ʘttʘ, and be able to turn on and off your charger, as well as view energy readings:

![control screen](/assets/docs/images/tasmota-pow2.png)
