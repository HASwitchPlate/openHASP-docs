# Flash ESP32

## Online Installation

With Chrome or Edge you can flash the ESP32 directly from within the browser window using the [openHASP Web installer](https://install.openhasp.com){target=_blank}.
If you have another browser then use the offline flash tools below to download and flash the ESP32.

## Download Firmware

Download the latest openHASP binaries from the [openHASP Web installer](https://install.openhasp.com){target=_blank} or
[GitHub Releases](https://github.com/HASwitchPlate/openHASP/releases){target=_blank} page.
You need to pick the correct binary files for your device:

- Get the *full* binary file for flashing over the serial port:</br>
  *e.g.* `d1-mini-esp32_ili9341_full_4MB_v{< openhasp.version >}.bin`
- Get the *ota* binary file for updating the firmware from the Web UI:</br>
  *e.g.* `d1-mini-esp32_ili9341_ota_v{< openhasp.version >}.bin`


!!! note
    You can also download the *nightly* openHASP development .zip files from the [Actions tab](https://github.com/HASwitchPlate/openHASP/actions){target=_blank} on Github.


## Flash ESP32

!!! important
    When flashing openHASP onto the ESP32 for the first time, you need to flash it over serial using the **full** firmware binary file.
    You need to write the full binary to the ESP32 flash chip at address `0x0`.

    The full binary also contains a bootloader and partition scheme needed to properly boot the ESP32.

Before starting the flash process you have to put the ESP into *flash mode*:

1. Connect `GPIO0` to `GND` before booting the devide
2. Power-on or reset the ESP while `GPIO0` is connected to `GND`
3. Start the flash process

The actual procedure to flash the ESP32 depends on the tool used. Click on the tab below that matches your flash tool.

!!! note
    ESPHome Flasher cannot flash the openHASP binary. Use one of the other tools below instead.

=== "ESPtool.py :material-linux::material-apple::material-microsoft-windows:"
    ```sh linenums="1"
    esptool.py --port COM1 erase_flash
    esptool.py --port COM1 --baud 921600 write_flash 0x0 d1-mini-esp32_ili9341_full_4MB_<version>.bin
    ```

    Change `COM1` to the correct port on your computer. If you get an error at the end of the flash procedure, you can try with a lower the baudrate eg. 460800.

=== "Tasmota-PyFlasher :material-microsoft-windows:"
    [Tasmota-PyFlasher](https://github.com/tasmota/tasmota-pyflasher/releases/tag/1.0){target=_blank} is a simple GUI tool for flashing ESP32 firmware without any installation.

    ![Tasmota-PyFlasher](../assets/images/esp32-pyflasher.png)

    Change `COM7` to the correct port on your computer.

=== "ESP Flash Tools :material-microsoft-windows:"
    Espressif provides their own [Flash Download Tools](https://www.espressif.com/en/support/download/other-tools){target=_blank} for Windows.

    ![Flash Download Tools](../assets/images/esp32-espressif-flash.png)

    Change `COM90` to the correct port on your computer.
