# FreeTouchDeck

<div class="row justify-content-center">
        <a href="../../assets/images/devices/freetouchdeck.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-6" data-title="FreeTouchDeck in 3D printed case" data-footer="Original image by Dustin Watts - Used with permission">
            <img src="../../assets/images/devices/freetouchdeck.jpg" class="img-fluid">
        </a>

        <a href="../../assets/images/devices/freetouchdeck-side.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-6" data-title="FreeTouchDeck in 3D printed case" data-footer="Original image by Dustin Watts - Used with permission">
            <img src="../../assets/images/devices/freetouchdeck-side.jpg" class="img-fluid">
        </a>
</div>
<div>
        <a href="../../assets/images/devices/freetouchdeck-bare.jpg" data-toggle="lightbox" data-gallery="example-gallery" rel="lightbox[work]" data-title="FreeTouchDeck PCB combiner with display" data-footer="Original image by Dustin Watts - Used with permission">more images...</a>
</div>

Features:

   - ESP32 DevKitC (38pin)
   - ILI9488 TFT SPI 4-WIRE
   - XPT2046 resistive touch controller

This board is created for the [FreeTouchDeck project](https://github.com/DustinWatts/FreeTouchDeck)
and the [PCB-combiner board](https://www.pcbway.com/project/shareproject/ESP32_TFT_Combiner_V1.html) is open source. Due to the extensive documentation it was easy to port openHASP to the FreeTouchDeck.

| Pros               | Cons
|:-----              |:----
| 480x320 Display    | 4 MB flash
| Price              | No PSram
| [Build Instructions][1] | Resistive touch

[1]: https://www.instructables.com/A-Bluetooth-ESP32-TFT-Touch-Macro-Keypad/

This is a kit so you need to assemble the parts yourself. Some soldering skills are required.
You can 3D print a custom enclosure.


## Video

![YOUTUBE](s2X4BQ9VmEU)

## 3D Printed Cases

You can find a 3D printable case on [Thingiverse]((https://www.thingiverse.com/thing:4661069)) and [Github](https://github.com/DustinWatts/FreeTouchDeck/tree/master/case/ESP32_TFT_Combiner_Case).

<div class="row justify-content-center">
        <a href="../../assets/images/devices/freetouchdeck-case1.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-4" data-title="FreeTouchDeck in 3D printed case" data-footer="Original image by Dustin Watts - Used with permission">
            <img src="../../assets/images/devices/freetouchdeck-case1.jpg" class="img-fluid">
        </a>

        <a href="../../assets/images/devices/freetouchdeck-case2.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-4" data-title="FreeTouchDeck in 3D printed case" data-footer="Original image by Dustin Watts - Used with permission">
            <img src="../../assets/images/devices/freetouchdeck-case2.jpg" class="img-fluid">
        </a>

        <a href="../../assets/images/devices/freetouchdeck-case3.png" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-4" data-title="FreeTouchDeck in 3D printed case" data-footer="Original image by Dustin Watts - Used with permission">
            <img src="../../assets/images/devices/freetouchdeck-case3.png" class="img-fluid">
        </a>
</div>

## Flashing

The FreeTouchDeck can easily be flashed over USB like any ESP32 development board.

## GPIO Settings

These pins can be used freely as GPIOs:

## PCB Blueprint

The PCB Combiner is fully [Open Source Hardware](https://github.com/DustinWatts/ESP32_TFT_Combiner):

- Schematics
- PCB layout

<a href="../../assets/images/devices/freetouchdeck-pcb.png" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-4" data-title="FreeTouchDeck PCB Combiner" data-footer="Original image by Dustin Watts - Used with permission">
    <img src="../../assets/images/devices/freetouchdeck-pcb.png" class="img-fluid">
</a>

## HASP build_flags

Specify the LCD Configuration to use and define the GPIOs in the environment build flags:

```ini
build_flags =
    ${env.build_flags}
    ${esp32.build_flags}

;region -- TFT_eSPI build options ------------------------
    -D USER_SETUP_LOADED=1
    -D ILI9488_DRIVER=1
    -D TFT_ROTATION=0 ; 0=0, 1=90, 2=180 or 3=270 degree
    -D TFT_WIDTH=320
    -D TFT_HEIGHT=480
    -D TFT_MISO=19    ; don't connect TFT SDO if other SPI devices share MISO
    -D TFT_MOSI=23
    -D TFT_SCLK=18
    -D TFT_CS=15      ; Chip select control pin
    -D TFT_DC=2       ; Data Command control pin
    -D TFT_RST=4      ; Reset pin (could connect to RST pin)
    -D TFT_BCKL=32    ; Default, configurable via web UI (e.g. 2 for D4)
    -D SUPPORT_TRANSACTIONS
    -D TOUCH_CS=21
    -D TOUCH_DRIVER=2046 ; XPT2606 Resistive touch panel driver
    -D SPI_FREQUENCY=27000000
    -D SPI_TOUCH_FREQUENCY=2500000
    -D SPI_READ_FREQUENCY=20000000
;endregion
```