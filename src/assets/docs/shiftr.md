
[shiftr.io](https://shiftr.io/) provides an MQTT broker that you can sign up to and use.

It also provides a quick and easy way to try it out.

Go to the [configuration panel](https://otto.zenly.xyz/identity) in ʘttʘ, and enter the following information:


* Hostname: **broker.shiftr.io**
* Port: **443**
* Protocol: **wss**
* Path: **/ws**
* Username: **try**
* Password: **try**
* Discovery Prefix: **otto**

You can now hit the "connect" button to establish a connection.

## Testing Subscribe

If you go to the [subscribe tab](https://otto.zenly.xyz/subscribe), you can enter "#" as a topic (which is a wildcard in MQTT speak), and hit the "Subscribe" button to see all the messages coming through the service.


## Creating a Test Sensor

Since we added a "Discovery Prefix" of "otto", ʘttʘ will look for topics that start with "otto" to decide what to display on the control panel.

For sensors, it will look for topics of the form "otto/sensor/SENSOR_NAME/config" where SENSOR_NAME is just a unique name.

To test this, publish this message from the [publish tab in ʘttʘ](https://otto.zenly.xyz/publish):

* topic: `otto/sensor/temperature/config`
* payload: `{"name": "Test Temperature", "unit_of_measurement": "°C", "state_topic": "temperature"}`
* Retain should be ticked

On the [control panel](https://otto.zenly.xyz/control) you should now see a temperature, but with no value. To add a value, publish a new message like this:

* topic: `temperature`
* payload: `42`
* Retain should be ticked

The control panel should now show the new temperature.

## Creating a Test Switch

For switches, it will look for topics that look like "otto/switch/SWITCH_NAME/config" where SWITCH_NAME is just a unique name.

Switch configurations need two topics; a "state_topic", which describes the current state of the switch (OFF or ON), and a "command_topic" to control the switch (also OFF or ON).  If this was a real switch, we would hope that the switch would be listening on the "command_topic" for new commands and publishing its state on the "state_topic".

To test this, publish this message from the  [publish tab in ʘttʘ](https://otto.zenly.xyz/publish):

* topic: `otto/switch/attackrobot/config`
* payload: `{"name": "Attack robot","state_topic": "attackrobot/state", "command_topic": "attackrobot/command"}`
* Retain should be ticked

On the [control panel](https://otto.zenly.xyz/control) you should now see the switch. If you click on it, ʘttʘ will publish a command to topic "attackrobot/command" with a payload of "ON".  Retain will not be set, so you will not see these messages unless you have the [subscribe tab](https://otto.zenly.xyz/subscribe) running in another browser window while you hit the button.

If this was a real switch, it might react to the command topic by turning itself on and publishing a message like this:

* topic: `attackrobot/state`
* payload: `ON`
* Retain should be ticked

Such a message will turn the button red on the [control panel](https://otto.zenly.xyz/control).
