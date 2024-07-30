# ESP-S3-BOX

## Features

The ESP-BOX is a series of development kits by Espressif. A handful of variations exist, but all feature an ESP32-S3 with PSRAM, a 320x240 2.4" LCD and a capacitive touchscreen controller. They also include two microphones and a speaker, though these are not used by OpenHASP. A number of GPIOs are also available, depending on variation and stand.

This devkit comes with a stand, which can be detached to hang the devkit on a wall instead. Power is supplied via USB-C, either plugged into the devkit or into its stand.

If considering purchasing, see [Variants](#variants)

| Pros                   | Cons
|:-----                  |:----
| With stand             | Poor viewing angles
| 8MB/16 PSRAM           | Small display
| Capacitive touchscreen |

## Gallery

<div class="row justify-content-center">
    <a href="../images/esp_box.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-4" data-title="ESP-BOX" data-footer="ESP-BOX in operation showing time, environmental data and controlling a light.">
        <img src="../images/esp_box.jpg" class="img-fluid">
    </a>
</div>

## Flashing
This devkit uses the native USB peripheral on the ESP32-S3. To put the devkit into flashing mode, hold the boot button (top button on the left edge) while clicking the reset button (bottom button on the left edge). After this, it can be flashed as usual. 

After flashing, click the reset button. You might need to open the serial port after flashing for the firmware to boot - in the UI, disable serial logging to fix this. <!-- Revisit after 0.7 is released. It seems to not be necessary on newer RC builds but I'd like someone else to verify if possible. -->

## Variants

|                 | **ESP32-S3-BOX**                                                                                                                                                                                 | **ESP32-S3-BOX-Lite**                                                                                                                                        | **ESP32-S3-BOX-3**                                                                                                                                                                      | **ESP32-S3-BOX-3B**                                      |
|-----------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------|
| **Description** | Original release. Case is 3D-printed, and includes a stand that exposes the GPIO pins and a USB-C port. If the stand is removed, the display can be wall-mounted. This variant has 8MB of PSRAM. | This is similar to the ESP32-S3-BOX, but does not have touch input; instead it has three buttons below the display. Stand is not included. Has 8MB of PSRAM. | Second generation device. Comes with a variety of stands, with various accessories integrated, but very few are supported. This version is no longer wall-mountable. Has 16MB of PSRAM. | The same as ESP32-S3-BOX-3, but has only a regular dock. |
| **Supported**   | Yes. Touch and display work.                                                                                                                                                                     | Untested. Display should work. Buttons not implemented.                                                                                                      | Yes. Touch and display work.                                                                                                                                                            | Yes. Touch and display work.                             |
| **Recommended** | No; deprecated and superseded - buy a ESP32-S3-BOX-3B instead.                                                                                                                                   | No. Does not support touch and has been superseded since.                                                                                                    | Yes, but consider the ESP32-SE-BOX-3B instead if only purchasing for OpenHASP - the additional accessories included in this variant are not supported by OpenHASP.                      | **Yes**                                                  |

For more information about the hardware, see [Espressif's documentation](https://github.com/espressif/esp-box).

## Other notes
- The mute button (on top) is on GPIO1 on all variants, and can be added as a switch (not button) input.