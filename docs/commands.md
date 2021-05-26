
Commands are not related to an object on the screen but can get or set global properties or invoke system commands on the device.

Commands can be issued via the Serial commandline, telnet commandline or MQTT.

For MQTT, use the `hasp/<nodename>/command` topic with payload `<keyword> <parameter(s)>`


## jsonl

_accepted parameters:_ one or more json formatted lines     

Create new objects *or* update the properties of an existing object. When updating an existing object the `obj` property is not required and will be ignored.

Each line in the `jsonl` payload defines one object and has to be in the json format. If the payload exceeds the MQTT buffer of 2 kB it will be cut off to fit,
don't send too many lines in a single payload, you can always sends multiple jsonl commands.

Example:    
```json
jsonl {"obj":"btn","id":14,"x":120,"y":1,"w":30,"h":40,"text_font":"2","text":"Test","text_color":"gray","bg_opa":0,"border_width":0}
```

_For more details see [Pages](../design/pages) and [Objects](../design/objects)._


## json

_accepted parameters:_ json array of strings

Use the `json` command to send multiple commands as an array of strings in one payload.

Example:    
```json
json ['page 3','backlight {"state":"OFF","brightness":100}','idle off']
```

This command will change to page 3, turn the backlight on at ~40% brightness and reset the idle timer.


## page

_accepted parameters:_ `[1-12]`, `prev`, `next` or `back`

Switches the display to show the objects from a different page and return the page number in `state/page`.

Calling the `page` command without a parameter will return the value of the current page in `state/page`.


## clearpage
_accepted parameters:_ `[0-12]` or `all`

Deletes all objects on a given page. If no page number is specified, it clears the current page.
Use `clearpage all` to clear all objects on all pages.

To delete individual objects, you can issue the `pXbY.delete` command.

<!--
## dim
_accepted parameters:_ `[0-255]`

Sets the level of the backlight from 0 to 255, where 0 is off and 255 is full brightness.

!!! example "Example"
    `dim 127` sets the display to half the brightness.

This can be used in conjunction with the [idle events][4], e.g. to dim the screen after a period of inactivity.

## light
_accepted parameters:_ `on`/`off`, `true`/`false`, `0`/`1`, `yes`/`no`

Switches the backlight on or off, independent of the set dim level. Turning the backlight on will restore the brightness to the previous dim level.

!!! example "Example"
    `light on` Turn the backlight on 

`dim` and `light` commands will work only if a Backlight GPIO pin is configured to the pin required to control the display backlight.

`dim 0` and `light 0` both turn off the screen, however, with `dim 0` the touching will haven an effect on the objects beneath but not wake the screen, while with `light 0` it will only wake the scren but will not affect the objects.

-->


## dim :material-alert-decagram:{ .tag-medium }

Deprecated, use `backlight` instead


## light :material-alert-decagram:{ .tag-medium }

Deprecated, use `backlight` instead


## backlight :material-new-box:{ .tag-medium }
_accepted json keys:_

- **state:** `on`/`off`, `true`/`false`, `0`/`1`, `yes`/`no`
- **brightness:** `1..255`

!!! example "Example"
    `backlight {"state":"on","brightness":128}` sets the display to half the brightness.

Instead of a json payload, you can use a simple payload.
To change the state, use either `on`/`off`, `true`/`false`, `0`, `yes`/`no`.
A simple integer payload of `1..255` will adjust the brightness.

!!! example "Example"
    `backlight off` </br>
    `backlight 200`  sets the display brightness to ~80%.


## moodlight
_accepted json keys:_

- **state:** `on`/`off`, `true`/`false`, `0`/`1`, `yes`/`no`
- **brightness:** `1..255` :material-new-box:{ .tag-small }
- **color** or
- **r, g, b:** `0..255`

An RGB moodlight can be controlled by configuring 3 [GPIO pins][3] as type `Mood Red`, `Mood Green` and `Mood blue`.
These leds can then be controlled together using the `moodlight` command.

```json
moodlight {"state":"off","color":"green"}
moodlight {"state":true,"color":"#ff00e7"}
moodlight {"color":12345}
moodlight {"state":"on","r":255,"g":0,"b":255}
```

- The `state` key accepts [boolean values][2] to turn the moodlight on or off
- The `brightness` key can be set between `1` and `255` to dim the moodlight
- The `color` key accepts [color values][1] to set the RGB channels at once
- Individual `r`, `g` and `b` keys can also be used to set each channel seperately

Calling the `moodlight` command without parameters (or sending an empty payload to the `hasp/<nodename>/command/moodlight` topic) returns the current state:

```json
"state/moodlight" {"state":"ON","brightness":255,"color":"#ff0000","r":255,"g":0,"b":0}
```

The color is returned as a hexadecimal value and as individual RGB channels.


## idle :material-new-box:{ .tag-medium }
_accepted parameters:_ `off`

Clears the idle state of the device and publishes a `state/idle = OFF` status message.

It resets the idle counter as if a touch event occurred on the device. This is helpful e.g. when you want to wake up the display when an external event has occurred, like a PIR motion sensor.

Calling the `idle` command without a parameter will return the current idle state `short`, `long` or `off` in the `state/idle` topic.


## wakeup :material-alert-decagram:{ .tag-medium }

Deprecated, use the `idle off` command instead


## output[x] :material-new-box:{ .tag-medium }

where `[x]` is number of the gpio pin (0-39)

_accepted json keys:_

- **state:** `on`/`off`, `true`/`false`, `0`/`1`, `yes`/`no`
- **val:** `0..255`

Changes the state GPIO pin to `on` or `off`. If the pin is configured as a `LED` or `Serial Dimmer` then the `val` key will control the brightness.

!!! bug
    It is currently required to set **both** `state` and `val` for relays:
    ```json
    output12 {"state":"on","val":1}
    output12 {"state":"off","val":0}
    ```
    Without `val` the relay won't switch.

!!! note
    If the GPIO is assigned to a group then objects and other GPIOs that share the same `groupid` will change state accordingly.


## System Commands

!!! danger "`calibrate`"

Start on-screen touch calibration.

You need to issue a soft reboot command to save the new calibration settings. If you do a hard reset of the device, the calibration settings will be lost.

!!! danger "`screenshot`"

Saves a picture of the current screen to the flash filesystem. You can retrieve it via http://&lt;ip-address&gt;/screenshot.bmp.
This can be handy for bug reporting or documentation.

The previous screenshot is overwritten.

!!! danger "`statusupdate`"

Reports the status of the MCU. The response will be posted to the state topic. For example:

```json
    "hasp/<platename>/state/statusupdate" => {
        "node":"plate35",
        "idle":"short",
        "version":"0.5.1",
        "uptime":1813,
        "ssid":"network",
        "rssi":-63,
        "ip":"192.168.4.2",
        "heapFree":125820,
        "heapFrag":35,
        "core":"v3.3.5-1-g85c43024c",
        "canUpdate":"false",
        "page":1,
        "numPages":12,
        "tftDriver":"ST7789",
        "tftWidth":240,
        "tftHeight":320
    }
```

!!! danger "`reboot` or `restart`"

Saves any changes in the configuration file and reboots the device.

!!! danger "`update`
    _accepted parameters:_ `[url]`

Update the firmware from the url provided. Reboots when update was successful.

!!! danger "`factoryreset`"

Clear the filesystem and EEPROM and reboot the device in its initial state.

!!! note "Warning"
    There is no confirmation prompt nor an undo function!


## Configuration Settings

### Wi-FI

!!! danger "`ssid`"

Set network name of the access point to connect to.

!!! danger "`pass`"

Set the optional password for the access point to connect to.

### MQTT

!!! danger "`nodename`"

Set the nodename of the device and mqtt topic for the node to `hasp/<nodename>/`

!!! danger "`mqtthost`"

Set the IP address or nodename of the mqtt broker.

!!! danger "`mqttport`"

Set the port of the mqtt broker.

!!! danger "`mqttuser`"

Set the optional username for the mqtt broker.

!!! danger "`mqttpass`"

Set the optional password for the mqtt broker.

## config/submodule

You can get or set the configuration of an openHASP submodule in json format.
To get the configuration, use the command `config/<submodule>`. 
The result will be published to `hasp/<nodename>/state/config`. Passwords will be omitted from the result.

```json
config/wifi
config/mqtt
config/http
config/mdns
config/hasp {"startdim":255}
config/gui
config/debug {"tele":300}
config/gpio
```

To update the configuration simply issue the same command `config/<submodule>` with updated json payload.


[1]: ../design/data-types#colors
[2]: ../design/data-types#boolean
[3]: ../configuration/gpio
[4]: ../configuration/display#short-idle
