---
title: ESP32-S3-Touch-LCD-2
---

# Waveshare ESP32-S3-Touch-LCD-2

The Waveshare ESP32-S3-Touch-LCD-2 is a 2-inch capacitive-touch panel based on an ESP32-S3. This page covers the standard board sold as Waveshare SKU 29667.

!!! success "Device tested"
    openHASP has been tested on a physical SKU 29667 board with the display, capacitive touch, PWM backlight, native USB, Wi-Fi, MQTT, web interface, and internal filesystem working. The PCB revision marking was not recorded during this test.

Owner-supplied board and operating-screen photographs will be added later.

## Specifications

| Component | Specification |
|:--|:--|
| MCU | ESP32-S3R8, dual-core 240 MHz |
| Flash | 16 MB |
| PSRAM | 8 MB octal PSRAM |
| Display | 2-inch IPS, 240 × 320, ST7789T3 over 4-wire SPI |
| Touch | CST816D capacitive touch over I²C |
| Backlight | Active-high PWM on GPIO1 |
| Wireless | 2.4 GHz Wi-Fi and Bluetooth 5 |
| USB | USB-C with native ESP32-S3 USB/CDC |
| Other onboard hardware | microSD slot, QMI8658 IMU, battery connector and charger, camera connector, and expansion GPIOs |

## Firmware

Use the public PlatformIO environment:

```text
waveshare-esp32-s3-touch-lcd-2
```

Release builds are included in the `waveshare` firmware artifact. To build from source:

```powershell
pio run -e waveshare-esp32-s3-touch-lcd-2
```

## Pin configuration

| Function | GPIO |
|:--|:--|
| Display MOSI | 38 |
| Display MISO | 40 |
| Display clock | 39 |
| Display chip select | 45 |
| Display data/command | 42 |
| Backlight PWM | 1 |
| Touch SDA | 48 |
| Touch SCL | 47 |
| Touch interrupt | 46 on the schematic; openHASP uses polling |

The display reset and touch reset signals are not controlled by openHASP. Touch is owned by the LovyanGFX CST816 integration to avoid competing controller instances.

## Flashing and recovery

The board can be flashed directly through its USB-C connector. Windows may assign different COM port numbers to normal runtime and ROM download mode; this is expected.

1. Connect the board to the computer using a data-capable USB-C cable.
2. Hold **BOOT**, press and release **RESET**, then release **BOOT** to enter ROM download mode.
3. Erase the device when performing a first installation, then flash the full 16 MB image at offset `0x0`.
4. Press **RESET** after flashing to start openHASP.
5. Complete Wi-Fi setup from the openHASP access point or web interface.

Normal firmware updates can subsequently use the openHASP web interface under **Firmware Update**.

## Tested behavior

The physical validation covered:

- full-screen 240 × 320 output in the documented orientation;
- correct colors and stable redraws;
- touch input across the display with matching coordinates and reliable release events;
- backlight off plus intermediate and full PWM brightness;
- native USB flashing and BOOT-mode recovery;
- Wi-Fi reconnection, web access, MQTT control, and Home Assistant interaction;
- internal configuration and page persistence across firmware updates and reboots.

## Known limitations

The microSD slot, QMI8658 IMU, battery telemetry and charging state, camera connector, and expansion GPIOs are not integrated by this board profile. Their presence on the board does not imply openHASP application support.

## Manufacturer resources

- [Product page](https://www.waveshare.com/esp32-s3-touch-lcd-2.htm)
- [Waveshare wiki](https://www.waveshare.com/wiki/ESP32-S3-Touch-LCD-2)
- [Waveshare documentation](https://docs.waveshare.com/ESP32-S3-Touch-LCD-2)
- [Official schematic](https://files.waveshare.com/wiki/ESP32-S3-Touch-LCD-2/ESP32-S3-Touch-LCD-2-SchDoc.pdf)
