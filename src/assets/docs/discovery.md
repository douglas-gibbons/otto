## Device Discovery

Otto reads retained MQTT messages from the `DISCOVERY_PREFIX/+/+/config` message topic. Where DISCOVERY_PREFIX is the prefix configured on the [configuration](https://otto.zenly.xyz/identity) screen, and "+" are wildcards.  It uses these messages to populate the control panel.

* A complete example of discovery messages can be found on the [Connecting to Shiftr.io](/docs/shiftr/) page.
* Also see [home assistant documentation](https://www.home-assistant.io/docs/mqtt/discovery/) for format of auto discovery messages.

You can add a new device to Otto, simply by publishing one of these MQTT messages, and the easiest way of doing that is by clicking the "New" button on the [devices page](https://otto.zenly.xyz/devices).
