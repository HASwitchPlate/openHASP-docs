## `antiburn`

_accepted parameters:_ `on`/`off`, `true`/`false`, `0`/`1`, `yes`/`no`   

Start LCD anti burn-in protection.

This cycles the display to a full black, red, green, blue and white color each second to relief the tension put on each individual pixel.
The cycle stops when either:

- 30 seconds have passed
- `antiburn=off` is received
- The screen is touched

If you're using Home Assistant, check out the [automation example][6] to make it run on a regular basis.

## `calibrate`

Start on-screen touch calibration.

You need to issue a soft reboot command to save the new calibration settings. If you do a hard reset of the device, the calibration settings will be lost.

## `discovery`

Trigger the sending of the discovery payload.

## `sensors` :material-new-box:{ .tag-medium }

Trigger the sending of the sensor data.

## `factoryreset`

Clear the filesystem and EEPROM and reboot the device in its initial state.

!!! note "Warning"
    There is no confirmation prompt nor an undo function!

## `reboot` or `restart`

Saves any changes in the configuration file and reboots the device.

## `screenshot`

Saves a picture of the current screen to the flash filesystem. You can retrieve it via http://&lt;ip-address&gt;/screenshot.bmp.
This can be handy for bug reporting or documentation.

The previous screenshot is overwritten.

## `service`

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
    It's possible to create self-built firmware binaries which have services stopped by default at boot, using [customization](firmware/compiling/customize.md). 

## `statusupdate`

Reports the status of the MCU. The response will be posted to the state topic.

!!! example "Example"
    ```json linenums="1"
    "hasp/<platename>/state/statusupdate" => {
        "node": "plate01",
        "idle": "long",
        "version": "0.6.3",
        "uptime": 11027,
        "ssid": "my_network",
        "rssi": -60,
        "ip": "192.168.0.133",
        "mac": "7C:87:CE:E3:55:55",
        "heapFree": 58756,
        "heapFrag": 7,
        "core": "v4.4.1",
        "canUpdate": "false",
        "page": 1,
        "numPages": 12,
        "tftDriver": "ILI9488",
        "tftWidth": 480,
        "tftHeight": 320
    }
    ```

## `unzip`

Unzip a file-packgage on the plate. You can upload **uncompressed** ZIP files to the flash space of your plate and unzip them locally. This is useful for cases when you need a lot of small files to be uploaded - putting them in an uncompressed zip allows to upload them in one go, and then extract them with a single command:

!!! example "Example"
    ```
    unzip /openhasp-weathericons-day.zip
    ```

## `update`

_accepted parameters:_ `[url]`     
Update the firmware from the url provided. Reboots when update was successful.

