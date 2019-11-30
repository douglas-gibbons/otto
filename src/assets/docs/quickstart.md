## Prerequisites

1. [MQTT broker with secure websockets enabled](http://www.steves-internet-guide.com/mqtt-websockets/)
1. Some sort of device or sensor that's connected to your MQTT broker.

There is no need to install Otto itself, as it is freely available at [otto.zenly.xyz](https://otto.zenly.xyz/).

## Getting Started

Otto gets its configuration from two places:

1. The [configuration tab](/identity), where you configure a connection to the MQTT broker. These settings are stored in your browser.
1. Retained messages from your MQTT broker.

First, navigate to the [configuration](identity) tab and enter details of your MQTT server.

Now you'll need to add retained messages to inform Otto about topics it can use to read and control devices. See the [discovery](/docs/discovery/) page.

## FAQ

#### Can I use an MQT broker over insecure websockets (HTTP rather than HTTPS)?

Selecting the "ws" protocol will cause an error on the [secure otto site](https://otto.zenly.xyz/), as your browser won't allow insecure connections from a secure page.

However, otto also runs from [http://otto.zenly.xyz/](https://otto.zenly.xyz/), where you _can_ make insecure connections. Otto itself does not store or transmit your MQTT connection information. This is transmitted direct from your browser, so take necessary precautions to ensure you don't leak credentials over the internet.
