# Otto

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

# License

[MIT](https://github.com/douglas-gibbons/otto/blob/master/LICENSE)
