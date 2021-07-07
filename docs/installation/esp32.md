# Flash ESP32

## Download the firmware

Go to the [releases](https://github.com/HASwitchPlate/openHASP/releases){target=_blank} page on GitHub to download the latest openHASP binaries.

Get the *full* binary file for your ESP32 device: *e.g.* d1-mini-esp32_ili9341_full_4MB_v0.6.0.bin

!!! note
    You can also download the *nightly* openHASP firmware.zip file from the [Actions tab](https://github.com/HASwitchPlate/openHASP/actions){target=_blank} on Github.


## Flash ESP32

!!! important
    When flashing openHASP onto the ESP32 for the first time, you need to flash it over serial using the **full** firmware binary file.
    You need to write the full binary to the ESP32 flash chip at address `0x0`.

    The full binary also contains a bootloader and partition scheme needed to properly boot the ESP32.

Before starting the flash process you have to put the ESP into *flash mode*:

1. Connect `GPIO0` to `GND` before booting the devide
2. Power-on or reset the ESP while `GPIO0` is connected to `GND`
3. Start the flash process

The actual procedure to flash the ESP32 depends on the tool used. Click on the tab below that matches your flash tool:

=== "ESPtool.py :material-linux::material-apple::material-microsoft-windows:"
    ```shell
    esptool.py --port COM1 erase_flash
    esptool.py --port COM1 --baud 921600 write_flash 0x0 d1-mini-esp32_ili9341_full_4MB_<version>.bin
    ```

    Change `COM1` to the correct port on your computer. If you get an error at the end of the flash procedure, you can try with a lower the baudrate eg. 460800.

=== "Tasmota-PyFlasher :material-microsoft-windows:"
    [Tasmota-PyFlasher](https://github.com/tasmota/tasmota-pyflasher/releases/tag/1.0){target=_blank} is a simple GUI tool for flashing ESP32 firmware wihout any installation.

    ![Tasmota-PyFlasher](../../assets/images/esp32-pyflasher.png)

    Change `COM7` to the correct port on your computer.

=== "ESP Flash Tools :material-microsoft-windows:"
    Espressif provides their own [Flash Download Tools](https://www.espressif.com/en/support/download/other-tools){target=_blank} for Windows.

    ![Flash Download Tools](../../assets/images/esp32-espressif-flash.png)

    Change `COM90` to the correct port on your computer.
