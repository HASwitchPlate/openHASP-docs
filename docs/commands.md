
Commands are not related to an object on the screen but can get or set global properties or invoke system commands on the device.

## Issuing commands

Commands can be issued via the Serial commandline, telnet commandline or MQTT.

For MQTT, you can use either:

- `hasp/<nodename>/command` topic with payload `<keyword> <parameter(s)>`
- `hasp/<nodename>/command/<keyword>` topic with payload `<parameter(s)>`

## Batch processing

Commands can be processed in batch one after another from `.cmd` script files located in the flash storage of the plate.    
General rules when creating `.cmd` batch scripts:

- can contain any command
- empty lines are ignored
- `#` or `//` can be used for comments
- `space` or `tab` in front of a command is ignored
- lines starting with `{` are processed as `jsonl` payloads
- lines starting with `[` are processed as `json` payloads
- other lines are processed as `<command> <payload>`
- `CR`, `LF` or `CRLF` line endings allowed
- `UTF8` encoding is required for special characters

To start a batch script, use `run` command.

### System scripts

If any of the following scripts is present on the filesystem, it will be run automatically according to the rules below:

- `/online.cmd` will be executed after connection to the network was successfull
- `/offline.cmd` will be executed after connection to the WiFi is lost

This makes it possible to disable or hide buttons, load a special offline page, etc. See [example][5].

## Global commands

### run

_accepted parameters:_ name of a `.cmd` or `.jsonl` file present on the flash filesystem of the plate. Filename must be preceeded by the `/` character      

Run a batch script or load a jsonl page.

!!! example "Example" 
    `run /script.cmd`         
    `run /pages_party_mode.jsonl`


### jsonl

_accepted parameters:_ one or more json formatted lines     

Create new objects *or* update the properties of an existing object. When updating an existing object the `obj` property is not required and will be ignored.

Each line in the `jsonl` payload defines one object and has to be in the json format. If the payload exceeds the MQTT buffer of 2 kB it will be cut off to fit,
don't send too many lines in a single payload, you can always sends multiple jsonl commands.

!!! example "Example"    
    ```json linenums="1"
    jsonl {"obj":"btn","id":14,"x":120,"y":1,"w":30,"h":40,"text_font":"2","text":"Test","text_color":"gray","bg_opa":0,"border_width":0}
    ```

_For more details see [Pages](../design/pages) and [Objects](../design/objects)._


### json

_accepted parameters:_ json array of strings

Use the `json` command to send multiple commands as an array of strings in one payload.

!!! example "Example"  
    ```json linenums="1"
    json ['page 3','backlight {"state":"ON","brightness":100}','idle off']
    ```

This command will change to page 3, turn the backlight on at ~40% brightness and reset the idle timer.


### page

_accepted parameters:_ `[1-12]`, `prev`, `next` or `back`

Switches the display to show the objects from a different page and return the page number in `state/page`.

Calling the `page` command without a parameter will return the value of the current page in `state/page`.


### clearpage
_accepted parameters:_ `[0-12]` or `all`

Deletes all objects on a given page. If no page number is specified, it clears the current page.
Use `clearpage all` to clear all objects on all pages.

To delete individual objects, you can issue the `pXbY.delete` command.

<!--
### dim
_accepted parameters:_ `[0-255]`

Sets the level of the backlight from 0 to 255, where 0 is off and 255 is full brightness.

!!! example "Example"
    `dim 127` sets the display to half the brightness.

This can be used in conjunction with the [idle events][4], e.g. to dim the screen after a period of inactivity.

### light
_accepted parameters:_ `on`/`off`, `true`/`false`, `0`/`1`, `yes`/`no`

Switches the backlight on or off, independent of the set dim level. Turning the backlight on will restore the brightness to the previous dim level.

!!! example "Example"
    `light on` Turn the backlight on 

`dim` and `light` commands will work only if a Backlight GPIO pin is configured to the pin required to control the display backlight.

`dim 0` and `light 0` both turn off the screen, however, with `dim 0` the touching will haven an effect on the objects beneath but not wake the screen, while with `light 0` it will only wake the scren but will not affect the objects.


### dim

!!! warning "Deprecated, use `backlight` instead"


### light

!!! warning "Deprecated, use `backlight` instead"

-->

### backlight :material-new-box:{ .tag-medium }
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


### moodlight
_accepted json keys:_

- **state:** `on`/`off`, `true`/`false`, `0`/`1`, `yes`/`no`
- **brightness:** `1..255` :material-new-box:{ .tag-small }
- **color** or
- **r, g, b:** `0..255`

An RGB moodlight can be controlled by configuring 3 [GPIO pins][3] as type `Mood Red`, `Mood Green` and `Mood blue`.
These leds can then be controlled together using the `moodlight` command.

!!! example "Example"
    ```json linenums="1"
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

!!! example "Example"
    ```json linenums="1"
    "state/moodlight" {"state":"ON","brightness":255,"color":"#ff0000","r":255,"g":0,"b":0}
    ```

The color is returned as a hexadecimal value and as individual RGB channels.


### idle :material-new-box:{ .tag-medium }
_accepted parameters:_ `off`

Clears the idle state of the device and publishes a `state/idle = OFF` status message.

It resets the idle counter as if a touch event occurred on the device. This is helpful e.g. when you want to wake up the display when an external event has occurred, like a PIR motion sensor.

Calling the `idle` command without a parameter will return the current idle state `short`, `long` or `off` in the `state/idle` topic.

<!--
### wakeup

!!! warning "Deprecated, use `idle off` instead"
-->

### output[x] :material-new-box:{ .tag-medium }

where `[x]` is number of the gpio pin (0-39)

_accepted json keys:_

- **state:** `on`/`off`, `true`/`false`, `0`/`1`, `yes`/`no`
- **val:** `0..255`

Changes the state GPIO pin to `on` or `off`. If the pin is configured as a `LED` or `Serial Dimmer` then the `val` key will control the brightness.

!!! note
    If the GPIO is assigned to a group then objects and other GPIOs that share the same `groupid` will change state accordingly.

!!! bug
    The `state` property currently only accepts unquoted boolean values of `true`/`false`, `0`/`1` to change the state, instead of the documented values.


### input[x] :material-new-box:{ .tag-medium }

where `[x]` is number of the gpio pin (0-39)

_read-only_

Returns a JSON object containing the current state of the input, either `on` or `off`

!!! example "Example"
    ```json linenums="1"
    input4 => {"state":"on"}
    ```

## System Commands

### `antiburn`

_accepted parameters:_ `on`/`off`, `true`/`false`, `0`/`1`, `yes`/`no`   

Start LCD anti burn-in protection.

This cycles the display to a full black, red, green, blue and white color each second to relief the tension put on each individual pixel.
The cycle stops when either:

- 30 seconds have passed
- `antiburn=off` is received
- The screen is touched

If you're using Home Assistant, check out the [automation example][6] to make it run on a regular basis.

### `calibrate`

Start on-screen touch calibration.

You need to issue a soft reboot command to save the new calibration settings. If you do a hard reset of the device, the calibration settings will be lost.

### `discovery`

Trigger the sending of the discovery payload.

### `factoryreset`

Clear the filesystem and EEPROM and reboot the device in its initial state.

!!! note "Warning"
    There is no confirmation prompt nor an undo function!

### `reboot` or `restart`

Saves any changes in the configuration file and reboots the device.

### `screenshot`

Saves a picture of the current screen to the flash filesystem. You can retrieve it via http://&lt;ip-address&gt;/screenshot.bmp.
This can be handy for bug reporting or documentation.

The previous screenshot is overwritten.

### `service`

Start or stop some of the processes running on the plate.

Currently supported parameters:

- `start`
- `stop`

Currently supported services:

- `http` (web interface)
- `telnet` (remote console)
- `console` (serial console)

!!! example "Example"
    To stop the web interface of the plate, send to topic `hasp/<your_plate>/command/service` the string `stop http`.
    To start the web interface of the plate, send to topic `hasp/<your_plate>/command/service` the string `start http`.


!!! tip
    Once these services are stopped, connection is lost/not possible to the plate through them. They can be started at any time by sending `service start` commands in through MQTT.             
    It's possible to create self-built firmware binaries which have services stopped by default at boot, using [customization](compiling/customize.md). 

### `statusupdate`

Reports the status of the MCU. The response will be posted to the state topic.

!!! example "Example"
    ```json linenums="1"
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

### `unzip`

Unzip a file-packgage on the plate. You can upload **uncompressed** ZIP files to the flash space of your plate and unzip them locally. This is useful for cases when you need a lot of small files to be uploaded - putting them in an uncompressed zip allows to upload them in one go, and then extract them with a single command:

!!! example "Example"
    ```
    unzip /openhasp-weathericons-day.zip
    ```

### `update`

_accepted parameters:_ `[url]`     
Update the firmware from the url provided. Reboots when update was successful.


## Configuration Settings

### Wi-FI

#### `ssid`

Set network name of the access point to connect to.

#### `pass`

Set the optional password for the access point to connect to.

### MQTT

#### `nodename`

Set the nodename of the device and mqtt topic for the node to `hasp/<nodename>/`

#### `mqtthost`

Set the IP address or nodename of the mqtt broker.

#### `mqttport`

Set the port of the mqtt broker.

#### `mqttuser`

Set the optional username for the mqtt broker.

#### `mqttpass`

Set the optional password for the mqtt broker.

### config/submodule

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



[1]: ../design/data-types#colors
[2]: ../design/data-types#boolean
[3]: ../configuration/gpio
[4]: ../configuration/display#short-idle
[5]: ../integrations/examples/example-offlinehandling
[6]: ../integrations/home-assistant/sampl_autom#prevent-burn-in-of-the-lcd-screen
