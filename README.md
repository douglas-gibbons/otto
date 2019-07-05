# Otto

Otto is a simple web application to control switches and view sensor output using MQTT over websockets. Connection settings are configured through the web interface, and stored in the browser's [local storage](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API).

There are also features for more general publish/subscribe of MQTT topics.

![screenshot](https://raw.githubusercontent.com/douglas-gibbons/otto/master/screenshot.png)

## Requirements

* [MQTT server with websockets enabled](http://www.steves-internet-guide.com/mqtt-websockets/)
* Some sort of service that controls the switches (see switch topics below)
* Retained topics for device discovery. See [home assistant documentation](https://www.home-assistant.io/docs/mqtt/discovery/) for format of auto discovery messages.

## Running Otto

Just navigate to __[https://otto.zenly.xyz/](https://otto.zenly.xyz/)__.

Note that connecting to this https service will only work with encrypted web sockets ("wss", not "ws"). That's a security feature of most modern web browsers.

If you want to connect to an MQTT service over unencryted websockets, you'll need to run the app yourself:

```
docker run --rm -p 8080:80 dougg/otto
```

## Device Configuration and Messages

The interface reads [discovery](https://www.home-assistant.io/docs/mqtt/discovery/) messages from the MQTT broker and uses these to configure what devices to display and control.

For example, suppose we configure otto to use a "discover prefix" of "homeassistant", and we publish a retained message like this:

* topic: `homeassistant/switch/sprinkler/config`
* payload: `{"name": "Sprinkler system", "state_topic": "homeassistant/switch/sprinkler/state", "command_topic": "homeassistant/switch/sprinkler/set"}`

Clicking on the web interface button to turn the sprinkler on will send a message on topic `homeassistant/switch/sprinkler/set` with a payload of `ON`

Once the sprinkler has been turned on, whatever is controlling it is expected to set `homeassistant/switch/sprinkler/state` to `ON` and set the retain flag on that messag

Likewise for turning our example sprinkler off.

Use of "set" and "state" messages is compatible with what [Home Assistant](https://www.home-assistant.io/components/switch.mqtt/) expects.

## Development Environment

### The Docker Way

Run `make up logs` to bring otto up and point a browser to http://localhost:4200/

### The Node Way

```
npm update
npm install
npm start
```

Navigate to: http://localhost:4200/
