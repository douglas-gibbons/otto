## Device Discovery

* A complete example of discovery messages can be found on the [Connecting to Shiftr.io](/docs/shiftr/) page.
* Also see [home assistant documentation](https://www.home-assistant.io/docs/mqtt/discovery/) for format of auto discovery messages.

### Configuring Switches

Suppose we configure ʘttʘ to use a "discover prefix" of "homeassistant", and we publish a retained message like this:

* topic: `homeassistant/switch/sprinkler/config`
* payload: `{"name": "Sprinkler system", "state_topic": "homeassistant/switch/sprinkler/state", "command_topic": "homeassistant/switch/sprinkler/set"}`

Clicking on the web interface button to turn the sprinkler on will send a message on topic `homeassistant/switch/sprinkler/set` with a payload of `ON`

Once the sprinkler has been turned on, whatever is controlling it is expected to set `homeassistant/switch/sprinkler/state` to `ON` and set the retain flag on that message.

Likewise for turning our example sprinkler off.

This use of "set" and "state" messages is compatible with [Home Assistant](https://www.home-assistant.io/components/switch.mqtt/).

### Configuring Sensors

Suppose we have a temperature sensor, publishing temperature to the topic "homeassistant/sensor/temperature". We would want to create a retained configuration message like this:

* topic: `homeassistant/sensor/temperature/config`
* payload: `{"name": "Temperature", "unit_of_measurement": "°C", "state_topic": "homeassistant/sensor/temperature"}`

Sometimes sensors publish json data as their payload. Simple json paths can be given as part of the configuration for this, using the "json_path" key.

For example, with a device producing a payload such as this to tele/charger/SENSOR:

```
{
  "ENERGY": {
    "Today":12.207
  }
}
```

A configuration payload might look like this:

```
{
  "name": "Charger energy usage today",
  "state_topic": "tele/charger/SENSOR",
  "unit_of_measurement": "kWh",
  "json_path": "ENERGY.Today"
}
```

See [this more complete example](https://github.com/douglas-gibbons/otto/wiki/pow2).

### Publishing Retained Messages

If you already have ʘttʘ connected to your MQTT server, the quickest way of publishing these messages is from the [publish tab](/publish).
