<h1>Installation</h1>

## Download the firmware

Go to the [releases](https://github.com/HASwitchPlate/openHASP/releases) page on GitHub to download the latest openHASP binaries.

Get the files required for ESP32:

- d1-mini-esp32_ili9341_full_4MB_v0.4.0.bin

!!! note
    You can also download the *nightly* openHASP firmware.zip file from the [Actions tab](https://github.com/HASwitchPlate/openHASP/actions) on Github.


## Install the firmware

### Flash ESP32

When flashing the ESP32 for the first time, you need to flash it over serial using the **full** firmware binary file:

```shell
esptool.py --port COM1 erase_flash
esptool.py --port COM1 --baud 921600 write_flash 0x0 d1-mini-esp32_ili9341_full_4MB_<version>.bin
```

Change `COM1` to the correct port on your computer.