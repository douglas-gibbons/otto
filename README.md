## <center>Otto<center>
__MQTT Control Panel__

----------------------------

User documentation can be found at [otto.zenly.xyz/docs](https://otto.zenly.xyz/docs)

## Running Otto

### Development Environment

#### The Docker Way

Run `make up logs` to bring Otto up,then point a browser at http://localhost:4200/

### Building and Running The Production Image

```
docker build . --tag=otto
docker run --rm -p 8080:80 otto
```

Navigate to: http://localhost:8080/


# License

Copyright [MIT License](https://github.com/douglas-gibbons/otto/blob/master/LICENSE)
