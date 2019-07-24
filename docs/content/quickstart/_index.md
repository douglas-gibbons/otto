+++
title = "Quickstart"
description = "Getting up and running with ʘttʘ"
weight = 10
+++

## Prerequisites

1. [MQTT server with websockets enabled](http://www.steves-internet-guide.com/mqtt-websockets/)
1. Some sort of device or sensor that's connected to your MQTT broker.

## Getting Started

ʘttʘ gets its configuration from two places:

1. The [identity tab](/identity), where you configure a connection to the MQTT broker. These settings are stored in your browser.
1. Retained messages from the MQTT broker.

First, navigate to the [identity](identity) tab and enter details of your MQTT server.

_Using an MQT broker over insecure websockets? Then you'll need to run ʘttʘ over HTTP, rather than HTTPS as well. Just follow the [installation instructions](../install/) rather than using the public ʘttʘ service._

Now you'll need to add retained messages to inform ʘttʘ about topics it can use to read and control devices. See the [discovery](discovery) page.
