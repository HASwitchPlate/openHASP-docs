
# Firmware Update

!!! warning
    The partition layout of openHASP 0.7.0 has changed!
    Follow the [Serial Update](#serial-update) procedure if you are running v0.6.x.

<div class="row justify-content-center">
            <a href="../firmware_upgrade.png" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-8" data-title="Firmware Upgrade" data-footer="">
                <img src="../firmware_upgrade.png" class="img-fluid img-thumbnail">
            </a>
</div>

## Over-The-Air

When openHASP 0.7.x is already running on the device you can upgrade the firmware from the Web UI.
For *Over-The-Air* updates you need to use the **ota** binary files.

### HTTP Upload

Click 'Browse' to select the **ota** file from your computer and click 'Update Firmware'. The 'Target' should be 'Firmware'.

### HTTP Update

You can also enter the **ota** URL to download new firmware from a webserver on your network or from the internet.
Both `http` and `https` links are supported but using `https` is recommended for additinal security.

Some content providers *-like Github-* redirect links to a server which is closest to you.
For safety reasons openHASP will not follow these redirect headers by default.
This behaviour can be changed by setting 'Follow Redirects' to either 'Strict' or 'Always':

- Strict adheres to RFC2616 and only follows redirects using `GET` or `HEAD` methods
- Always will follow *all* redirects regardless of a used method, which is less secure

!!! note
    You can also trigger an upgrade using the `update` command from the Serial console, telnet or MQTT.

### Arduino OTA

When you are [developing locally](compiling/local.md) it can be useful to update a plate *Over-The-Air* using Arduino OTA.
The Arduino OTA service is not enabled in the official releases.

For this option to work, the firmware has to be compiled with `HASP_USE_ARDUINOOTA=1` enabled in `include/user_config_override.h`.
Then update the `platformio_override.ini` with the IP address instead of a serial port:

```ini
[env:lanbon_l8]
; upload_port = COM3       ; Disable serial upload
; monitor_port = COM3      ; Disable serial upload
upload_protocol = espota   ; Use Arduino OTA to flash the firmware over-the-air
upload_port = 192.168.7.89 ; Specify the IP of the ESP
upload_flags =
    --auth=haspadmin       ; optional OTA password, none by default
    --port=3232            ; optional remote port on the ESP, 3232 by default
    --host_port=45678      ; optional local port for access through the firewall
```

## Serial Update

!!! warning
    - Devices **coming from 0.6.x with 4MB flash** *will* be reformatted and loose all data!!!
    - Devices with 8MB flash or more *should* retain the filesystem and user configuration.

It is important to first make a full backup of the device:

- Download the files from the filesystem to your PC.
- Create a full backup of the flash chip using esptool.py

Flash a **full** binary file onto the ESP32. The procedure is the same as the initial installation.
Do **not** erase the flash first in this situation because that **will** destroy *all* files and settings!
