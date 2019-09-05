The [Tasmota](https://github.com/arendst/Sonoff-Tasmota/wiki) project provides open source hardware for IoT devices. ʘttʘ can be used as a control panel for multiple Tasmota devices.

#### Prerequisites

ʘttʘ controls devices using MQTT over websockets, so you'll need an [MQTT broker with secure websockets enabled](http://www.steves-internet-guide.com/mqtt-websockets/).

There is usually no need to install ʘttʘ itself, as it is freely available at [otto.zenly.xyz](https://otto.zenly.xyz/).

#### Setting up a Tasmota device

Once you have a Tasmota device up and running on your WiFI network it can be configured to run with ʘttʘ:

1. From the device's web page, click on "Configuration" and then "Configure MQTT"
1. Set up the Host, Port, Client, User and Password of your MQTT broker
1. Change "Topic" to be a unique device name. For example "bob", in my case, because the light I want to control is called "bob" (don't ask me why)
1. Click "save" and let the device restart
1. ʘttʘ uses retained messages, so click on "Console", type in `PowerRetain 1` then press Enter to enable retained messages


![screenshot](/assets/docs/images/tasmota-screenshot.png)

Now you need to create a configuration message on your MQTT broker to tell ʘttʘ all about your device. See the section below.

#### Creating a Config Message for ʘttʘ

ʘttʘ populates its control panel by reading retained configuration messages from your MQTT broker. We can tell ʘttʘ all about this device by publishing a message.

For example, suppose we're using a "Discovery Prefix" in ʘttʘ of "otto" (configured from the "Configuration" tab in ʘttʘ) and the Topic configured on the device is "bob", then we should publish a message like this:


Topic: __otto/switch/bob/config__

Payload (change the state and command topic prefixes as appropriate):
```
{  
  "name": "bob the light",
  "state_topic": "stat/bob/POWER",
  "command_topic": "cmnd/bob/POWER"
}
```
__Retain__ should set to true

Once ʘttʘ is configured to connect to your message broker, you can use the "Publish" panel to add the retained message:

![screenshot](/assets/docs/images/tasmota-otto-config.png)

_For details of the MQTT message flow for Tasmota devices, see the [Sonoff-Tasmota Wiki](https://github.com/arendst/Sonoff-Tasmota/wiki/MQTT-Overview)_

#### Testing it out

Refresh the ʘttʘ control panel and you should now see the device show up in ʘttʘ's "Contol" panel, all ready to use.

![screenshot](/assets/docs/images/tasmota-otto-switch.png)
