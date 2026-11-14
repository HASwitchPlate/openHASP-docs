## Wi-FI

### `ssid`

Set network name of the access point to connect to.

### `pass`

Set the optional password for the access point to connect to.

## MQTT

### `hostname`

Set the hostname of the device and mqtt topic for the node to `hasp/<nodename>/`

### `mqtthost`

Set the IP address or hostname of the mqtt broker.

### `mqttport`

Set the port of the mqtt broker.

### `mqttuser`

Set the optional username for the mqtt broker.

### `mqttpass`

Set the optional password for the mqtt broker.

## config/submodule

You can get or set the configuration of an openHASP submodule in json format.
To get the configuration, use the command `config/<submodule>`: 

`config/wifi`    
`config/mqtt`    
`config/http`    
`config/mdns`    
`config/hasp`    
`config/gui`    
`config/debug`    
`config/gpio`    

The result will be published to `hasp/<nodename>/state/config`. Passwords will be omitted from the result.    

To update the configuration simply issue the same command `config/<submodule>` with updated json payload.

!!! example "Example"
    `config/gui {"idle2":0}` disable long idle (don't turn off the screen completely)    
    `config/debug {"tele":300}` set the telemetry period to 300 seconds    
    `config/hasp {"startdim":255}` to set the startup brightness to 255    

### Idle touch lock

The optional native idle lock intercepts the whole screen after the short-idle period. It displays a lock overlay, requires a continuous hold to unlock, and consumes the release so the unlocking gesture cannot activate an object underneath it.

The `config/gui` payload accepts these settings:

| Setting | Unit | Description |
|:--|:--|:--|
| `idle1` | seconds | Inactivity before short idle and locking |
| `idlelock` | boolean | Enable or disable the native idle lock |
| `idlelockhold` | milliseconds | Required continuous hold, from 250 to 60000 ms |
| `idlelockscreen` | seconds | Time to show the locked screen before turning off the backlight; `0` keeps it on |

An unsuccessful touch restarts `idlelockscreen`. The backlight remains on while a hold is in progress.

For example, this Home Assistant action enables locking after two minutes, requires a three-second hold, and turns the locked screen off after five seconds:

```yaml
action: mqtt.publish
data:
  topic: hasp/plate/command/config/gui
  payload: '{"idle1":120,"idlelock":true,"idlelockhold":3000,"idlelockscreen":5}'
```

Replace `plate` with the openHASP node name. Home Assistant can publish the same payload whenever helpers change or when the panel reconnects.

