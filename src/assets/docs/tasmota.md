The [Tasmota](https://github.com/arendst/Sonoff-Tasmota/wiki) project provides open source hardware for IoT devices. Once you have a Tasmota device up and running on your WiFI network it can be set up to run with ʘttʘ:

#### Setting up the device

1. From the device's web page, click on "Configuration" and then "Configure MQTT"
1. Set up the Host, Port, Client, User and Password of your MQTT broker
1. Change "Topic" to be a unique device name. For example "sonoff-6908" (see screenshot)
1. Add your "Dsicovery Prefix" to the start of the "Full Topic". For example, if your discovery prefix is "homeassistant", the full topic should be "homeassistant/%prefix%/%topic%/"
1. Click "save" and let the device restart
1. ʘttʘ uses retained messages, so click on "Console", type in `PowerRetain 1` then press Enter to enable retained messages
1. Now you need to create a configuration message on your MQTT broker to tell ʘttʘ all about your device. See the section below

![screenshot](/assets/docs/images/tasmota-screenshot.png)


#### Creating a Config Message for ʘttʘ

ʘttʘ populates its control panel by reading retained configuration messages from your MQTT broker. We can tell ʘttʘ all about this device by publishing a message.

For example, suppose we're using a "Discovery Prefix" in ʘttʘ of "homeassistant" and the Topic configured on the device is "sonoff-6908", then we should publish a message like this:


Topic: __homeassistant/switch/sonoff-6908/config__

Payload (change the state and command topic prefixes as appropriate):
```
{  
  "name": "Sonoff 6908",
  "state_topic": "homeassistant/stat/sonoff-6908/POWER",
  "command_topic": "homeassistant/cmnd/sonoff-6908/POWER"
}
```
__Retain__ should set to true


Note that the "name" field is the text displayed in ʘttʘ. It can be whatever makes sense for your device, such as "sprinkler system", or "attack robot".

ʘttʘ's "Publish" panel can be used to publish this message, like this:

![screenshot](/assets/docs/images/tasmota-otto-config.png)


#### Testing it out

Refresh the ʘttʘ website and you should now see the device show up in ʘttʘ's "Contol" panel, all ready to use.

![screenshot](/assets/docs/images/tasmota-otto-switch.png)
