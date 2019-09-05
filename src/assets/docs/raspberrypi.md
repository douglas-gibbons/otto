## Installing on a Raspberry Pi

You might want to run ʘttʘ locally in your own network rather than using [otto.zenly.xyz](https://otto.zenly.xyz).

This might be especially useful if you're running your own MQTT broken with websockets enabled, but only HTTP, rather than HTTPS. The public ʘttʘ is restricted to just connected to HTTPS brokers.

Luckily, there's a compatible Docker image, just for you; called "**dougg/otto:arm**".

This can be run with:

```
docker run -p 80:80 dougg/otto:arm
```

### Example Docker Compose Configuration

Rasperry Pis make excellent hosts for services using docker compose with docker machine. See [this guide on installing docker machine on the Raspberry Pi](https://www.carothers.io/blog/docker-machine-on-raspberry-pi.html).

This example docker-compose.yaml file runs a mosquitto service (see mosquitto.conf below, which needs to be copied in place), as well as ʘttʘ.

```
version: '2'

services:

  mosquitto:
    image: eclipse-mosquitto
    restart: always
    ports:
      - 9001:9001
      - 1883:1883
    volumes:
      - /data/mosquitto/data:/mosquitto/data
      - /data/mosquitto/config:/mosquitto/config
      - /etc/ssl/certs:/etc/ssl/certs

  otto:
    image: dougg/otto:arm
    restart: always
    ports:
      - 80:80
```


### Example Mosquitto Configuration File

This example mosquitto.conf runs two listeners; one on port 9001 for websockets (HTTP, rather than HTTPS), and one on port 1883 for MQTT traffic.  Both allow anonymous access, so do not let this kind of service onto the internet!

```
allow_anonymous true

listener 9001
protocol websockets

listener 1883
max_connections 1000

```

If you want to sync messages with a remote MQTT broker, add this configuration and modify it as required:

```
connection remote_broker
address HOSTNAME:8883
bridge_cafile /etc/ssl/certs/ca-certificates.crt
remote_password CHANGE_ME
remote_username CHANGE_ME
topic homeassistant/# out 1
topic homeassistant/# in 1
topic stat/# out 1
topic stat/# in 1
topic cmnd/# out 1
topic cmnd/# in 1
```
