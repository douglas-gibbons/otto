+++
title = "ʘttʘ"
description = "ʘttʘ homepage"
+++

## <center>ʘttʘ<c/enter>
<center>__MQTT Control Panel__</center>

----------------------------

ʘttʘ is a web application used to control switches and view sensor output using MQTT over websockets. Connection settings are configured through the web interface, and stored in the browser's [local storage](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API).

There are also features for more general publish/subscribe of MQTT topics.

## Requirements

* [MQTT server with websockets enabled](http://www.steves-internet-guide.com/mqtt-websockets/)
* Some sort of service that controls the switches (see switch topics below)
* Retained topics for device discovery. See [home assistant documentation](https://www.home-assistant.io/docs/mqtt/discovery/) for format of auto discovery messages.


## Running ʘttʘ

Just navigate to __[https://otto.zenly.xyz/](https://otto.zenly.xyz/)__.


## Device Configuration and Messages

The interface reads [discovery](https://www.home-assistant.io/docs/mqtt/discovery/) messages from the MQTT broker and uses these to configure what devices to display and control.

For example, suppose we configure ʘttʘ to use a "discover prefix" of "homeassistant", and we publish a retained message like this:

* topic: __homeassistant/switch/sprinkler/config__
* payload: __{"name": "Sprinkler system", "state_topic": "homeassistant/switch/sprinkler/state", "command_topic": "homeassistant/switch/sprinkler/set"}__

Clicking on the web interface button to turn the sprinkler on will send a message on topic __homeassistant/switch/sprinkler/set__ with a payload of __ON__

Once the sprinkler has been turned on, whatever is controlling it is expected to set __homeassistant/switch/sprinkler/state__ to __ON__ and set the retain flag on that message.

Likewise for turning our example sprinkler off.

Use of "set" and "state" messages is compatible with what [Home Assistant](https://www.home-assistant.io/components/switch.mqtt/) expects.
