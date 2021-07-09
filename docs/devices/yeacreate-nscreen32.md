# YeaCreate Nscreen32

<div class="row justify-content-center">
    <a href="../../assets/images/devices/nscreen32-1.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-4" data-title="Nscreen32 Front" data-footer="Copyright &copy; 2017-2021 YeaCreate - All Rights Reserved.">
        <img src="../../assets/images/devices/nscreen32-1.jpg" class="img-fluid">
    </a>

    <a href="../../assets/images/devices/nscreen32-2.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-4" data-title="Nscreen32 Back" data-footer="Copyright &copy; 2017-2021 YeaCreate - All Rights Reserved.">
        <img src="../../assets/images/devices/nscreen32-2.jpg" class="img-fluid">
    </a>

    <a href="../../assets/images/devices/nscreen32-3.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-4" data-title="Nscreen32 Front" data-footer="Copyright &copy; 2017-2021 YeaCreate - All Rights Reserved.">
        <img src="../../assets/images/devices/nscreen32-3.jpg" class="img-fluid">
    </a>
</div>

The Nscreen32 uses an ESP32-WROVER-IE module with a large 4-inch capacitive touch display.
The display is connected via an 8-bit parallel bus resulting in a fast performance.
openHASP can take advantage of the 320x480 resolution to show a large custom user-interface.

On the back there is an expansion port with 12 GPIOs so you can expand the capabilities as needed.
Unfortunately, there is [no support for backlight control][2]{target=_blank}. The display is always-on.

The development board can be powered via micro USB or the 5V-in JST connector.

| Pros                   | Cons
|:-----                  |:----
| 8-bit parallel display | No backlight control 
| 16 MB flash + 8 MB PSram | Always-on display
| Capacitive Touchscreen |
| Viewing angles         |
| External antenna       |

[:material-cart-variant: YeaCreate Store][1]{target=_blank .md-button .md-button--primary }


## Documentation

Some example projects and the schematics for the Nscreen32 can be found on the Yeacreate Github repository.

[:material-github: Github Repo][3]{target=_blank .md-button .md-button } &nbsp;
[:material-github: Schematics][4]{target=_blank .md-button .md-button }


## Video

Nscreen32 is the first device to receive the LVGL Certified Board label:

<div class="embed-responsive embed-responsive-16by9" style="max-width:560px; margin:auto;">
    <iframe title="YouTube video player" src="https://www.youtube.com/embed/9lDxJRI9BwM?rel=0&controls=1" class="embed-responsive-item" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
    </iframe>
</div>

## HASP build_flags

Specify the LCD Configuration to use and define the GPIOs in the environment build flags:

```ini
build_flags =
    ${env.build_flags}
    ${esp32.build_flags}
    ${esp32.hspi}        ; Use VSPI hardware SPI bus
    -D HASP_MODEL="YeaCreate Nscreen32"

;region -- TFT_eSPI build options ------------------------
    -D USER_SETUP_LOADED=1
    -D ST7796_DRIVER=1
    -D ESP32_PARALLEL=1
    -D TFT_ROTATION=0 ; 0=0, 1=90, 2=180 or 3=270 degree
    -D TFT_WIDTH=320
    -D TFT_HEIGHT=480
    ; ESP32 pins used for the parallel interface TFT
    -D TFT_CS=33    ; Chip select control pin
    -D TFT_DC=15    ; Data Command control pin - must use a pin in the range 0-31 also named RS
    -D TFT_WR=4     ; Write strobe control pin - must use a pin in the range 0-31
    -D TFT_RD=2
    -D TFT_D0=12    ; Must use pins in the range 0-31 for the data bus
    -D TFT_D1=13    ; so a single register write sets/clears all bits
    -D TFT_D2=26
    -D TFT_D3=25
    -D TFT_D4=19
    -D TFT_D5=18
    -D TFT_D6=27
    -D TFT_D7=14
    -D TFT_RST=32   ; Reset pin
    ;-D TFT_BCKL=32  ;None, configurable via web UI (e.g. 2 for D4)
    -D SUPPORT_TRANSACTIONS
    -D TOUCH_DRIVER=911  ; GT911 Capacitive touch panel driver 
    -D TOUCH_SDA=21
    -D TOUCH_SCL=22
    -D TOUCH_IRQ=5
    -D TOUCH_RST=23
    ;-D TOUCH_FREQUENCY=400000
    -D I2C_TOUCH_FREQUENCY=400000
    -D SPI_FREQUENCY=40000000
    -D SPI_READ_FREQUENCY=20000000
;endregion
```

[1]: https://store.yeacreate.com/products/3
[2]: https://github.com/yeacreate-opensources/Nscreen_32/issues/2
[3]: https://github.com/yeacreate-opensources/Nscreen_32
[4]: https://github.com/yeacreate-opensources/Nscreen_32/blob/master/documents/Schematic.pdf