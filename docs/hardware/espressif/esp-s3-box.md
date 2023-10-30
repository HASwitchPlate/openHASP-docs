# ESP-S3-BOX

## Features

The ESP-BOX is a development kit by Espressif that features an ESP32-S3 with 8MB of PSRAM, a 320x240 2.4" LCD and a TT21100 capacitive touchscreen controller. It also includes two microphones and a speaker, though these are not used by OpenHASP. A number of GPIOs are on the rear (or on the stand, if equipped).

This devkit comes with a stand, which can be detached to hang the devkit on a wall instead. Power is supplied via USB-C, either plugged into the devkit or into its stand.

| Pros                   | Cons
|:-----                  |:----
| With stand             | Poor viewing angles
| 8MB PSRAM              | Small display
| Capacitive touchscreen |

## Gallery

<div class="row justify-content-center">
    <a href="../images/esp_box.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-4" data-title="ESP-BOX" data-footer="ESP-BOX in operation showing time, environmental data and controlling a light.">
        <img src="../images/esp_box.jpg" class="img-fluid">
    </a>
</div>

## Flashing
This devkit uses the native USB peripheral on the ESP32-S3. To put the devkit into flashing mode, hold the boot button (top button on the left edge) while clicking the reset button (bottom button on the left edge). After this, it can be flashed as usual. 

After flashing, click the reset button. You will need to open the serial port after flashing for the firmware to boot - in the UI, disable serial logging to fix this.

## Variations

### ESP-S3-BOX-3
This is not to be confused with the newer ESP-S3-BOX-3. The ESP-S3-BOX-3 uses the same display driver and may be compatible, but has not been tested yet. This variant also has 16MB of PSRAM.

### ESP-S3-BOX-LITE

A -LITE version also exists, which does not have a touch layer. The display controller is the same and should work for purely informational displays, though untested.