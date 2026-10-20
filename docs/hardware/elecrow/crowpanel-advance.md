# CrowPanel Advance 5.0 and 7.0

Use the matching environment for an N16R8 CrowPanel Advance board:

- `elecrow-s3-8048c050-advance-v13_16MB`: 5-inch DIS02050A PCB V1.3
- `elecrow-s3-8048c070-advance-v13_16MB`: 7-inch PCB V1.3, V1.4 or V1.5

These are separate profiles from the older WZ8048C050 and WZ8048C070
boards; their RGB, touch and board-controller settings must not be reused
for an Advance display. The 7-inch V1.2 board is also not supported because
it uses a different backlight-controller protocol.

Include `user_setups/esp32s3/crowpanel-hmi.ini` in the PlatformIO
configuration's `extra_configs`, then select this environment by name.

The profiles configure the 800 × 480 RGB panel and GT911 touch controller
using Elecrow's LovyanGFX examples for the
[5-inch V1.2/V1.3 board](https://github.com/Elecrow-RD/CrowPanel-Advance-5-HMI-ESP32-S3-AI-Powered-IPS-Touch-Screen-800x480/blob/19b0f58cdb046493238f1dbf2e04215cf8d6bdec/example/V1.2_and_V1.3/Arduino/lesson-03/BigInch_LVGL/LovyanGFX_Driver.h)
and the
[7-inch V1.3/V1.4/V1.5 board](https://github.com/Elecrow-RD/CrowPanel-Advance-7-HMI-ESP32-S3-AI-Powered-IPS-Touch-Screen-800x480/blob/master/example/V1.3_and_V1.4_and_V1.5/Arduino/lesson-03/BigInch_LVGL/LovyanGFX_Driver.h).
GPIO15/16 carry the shared I²C bus. The board's controller at address `0x30`
handles backlight commands; the GT911 is at `0x5D`. Backlight values are
inverted: `0` is brightest and `245` is off. Values above `245` are reserved
for controller commands. Startup performs bounded touch activation using
GPIO1 if the GT911 does not initially respond. If the controller at `0x30`
is missing, the board-specific code does not pulse GPIO1 or send backlight
commands. These behaviors follow Elecrow's [5-inch V1.2/V1.3 startup example](https://github.com/Elecrow-RD/CrowPanel-Advance-5-HMI-ESP32-S3-AI-Powered-IPS-Touch-Screen-800x480/blob/19b0f58cdb046493238f1dbf2e04215cf8d6bdec/example/V1.2_and_V1.3/Arduino/lesson-03/BigInch_LVGL/BigInch_LVGL.ino)
and the corresponding 7-inch example.

Before using either profile on hardware, confirm the supported PCB marking
and that the module is the N16R8 variant. After flashing, verify the image,
touch coordinates, brightness and off/on commands on a real panel. A
successful build alone cannot validate the display wiring or
board-controller behavior.
