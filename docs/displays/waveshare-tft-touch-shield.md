# Waveshare TFT Touch Shield

<div class="row justify-content-center">
        <a href="../../assets/images/displays/waveshare-touch-shield-28-angle.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-4" data-title="Waveshare 2.8&quot; TFT Touch Shield" data-footer="Copyright © 2021, Waveshare, All Rights Reserved - Permission Pending"">
            <img src="../../assets/images/displays/waveshare-touch-shield-28-angle.jpg" class="img-fluid">
        </a>
        <a href="../../assets/images/displays/waveshare-touch-shield-35-side.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-4" data-title="Waveshare 3.5&quot; TFT Touch Shield" data-footer="Copyright © 2021, Waveshare, All Rights Reserved - Permission Pending"">
            <img src="../../assets/images/displays/waveshare-touch-shield-35-side.jpg" class="img-fluid">
        </a>
        <a href="../../assets/images/displays/waveshare-touch-shield-40-side.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-4" data-title="Waveshare 4&quot; TFT Touch Shield" data-footer="Copyright © 2021, Waveshare, All Rights Reserved - Permission Pending"">
            <img src="../../assets/images/displays/waveshare-touch-shield-40-side.jpg" class="img-fluid">
        </a>
</div>

Waveshare has a line of [TFT Touch Shields for Arduino][8]{target=_blank} which are also plug-and-play compatible with the ESPDUINO-32 aka. Wemos “TTGo” D1 R32 board.
Unlike many other common Arduino UNO shields the Waveshare displays have an SPI interface with resistive touch controller and [backlight control](#backlight-control).

Be sure to check if the `LCD_BL`, `LCD_CS` and `TP_CS` pins are present. If these pins are missing, the screen won't work with the pre-compiled builds.

## Models

There are 3 models of this TFT shield:

<!-- this is a comment
# Model                   | 2.8" Rev 2.1 | 3.5inch | 4.0inch
#-------------------------|:-------:|:-------:|:--------:
# SKU                     | [10684][1]{target=_blank} | [13506][2]{target=_blank} | [13587][3]{target=_blank}
# Resolution              | 320x240 | 480x320 | 480x320
# TFT controller          | ST7789</br>*(Rev 2.1 only)*  | ILI9486 | ILI9486
# Interface               | SPI     | SPI     | SPI
# Touchscreen             |Resistive|Resistive|Resistive
# Touch controller        | XPT2046 | XPT2046 | XPT2046
# SD Card                 | :white_check_mark: yes| :white_check_mark: yes| :white_check_mark: yes
# Screen dimming          | :white_check_mark: yes | :white_check_mark: yes | :white_check_mark: yes   
# | {!assets/buy/waveshare-tft-touch-shield.md!}
-->

{!assets/buy/waveshare-tft-touch-shield-table.html!}

## Backlight Control

All three models come with an `LCD_BL` pin that allows for backlight control.
It is connected to `GPIO13` on the D1 R32 development board.


## Documentation

[:material-book-open-page-variant: Waveshare Wiki][6]{target=_blank .md-button .md-button } &nbsp;
[:fontawesome-regular-file-pdf: Schematics][7]{target=_blank .md-button .md-button }


## Configuration

!!!note
    By default the DIP switches on the display are set in the `ICSP` position instead of the `SPI` position.

You need to peel of the orange tape that sticks on top of the dip switches.
Then move all 3 DIP switches to the `ON` position with a tiny screwdriver.

The 2.8" model has 3 solder bridges `SB1`, `SB2` and `SB3` that need to be bridged instead!

![PCB Dimensions](../assets/images/displays/waveshare-touch-shield-40-dimensions.jpg)


## Development Boards

### D1 R32

The Waveshare TFT Touch Shields are compatible with the *ESPDUINO-32* aka. *Wemos “TTGo” D1 R32* development board.
It contains an ESP32-WROOM module with 4MB flash.

<div class="row justify-content-center">
        <a href="../../assets/images/devices/wemos-d1-r32.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-6" data-title="Wemos D1 R32" data-footer="">
            <img src="../../assets/images/devices/wemos-d1-r32.jpg" class="img-fluid">
        </a>

        <a href="../../assets/images/devices/wemos-d1-r32-silkscreen.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-6" data-title="Wemos D1 R32" data-footer="">
            <img src="../../assets/images/devices/wemos-d1-r32-silkscreen.jpg" class="img-fluid">
        </a>
</div>

!!! warning
    The D1 R32 ESP32 board may suffer from brown-out reboots if not powered adequately.


### Arducam IoTai ESP32

Onboard 4MB PSRAM, 4MByte Flash

*To be tested*

<div class="embed-responsive embed-responsive-16by9" style="max-width:560px; margin:auto;">
    <iframe title="YouTube video player" src="https://www.youtube.com/embed/MYkzICQpOck?rel=0&controls=1" class="embed-responsive-item" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
    </iframe>
</div>

### Adafruit Metro ESP32-S2

With 4 MByte of Flash and 2 MByte of PSRAM

*To be tested*

<div class="row justify-content-center">
        <a href="../../assets/images/devices/adafruit_products_Metro_ESP32S2_top.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-6" data-title="Adafruit Metro ESP32-S2 Overview" data-footer="Attribution-ShareAlike Creative Commons - Kattni Rembor">
            <img src="../../assets/images/devices/adafruit_products_Metro_ESP32S2_top.jpg" class="img-fluid">
        </a>
        <a href="../../assets/images/devices/adafruit_products_Adafruit_Metro_ESP32-S2_pinout.png" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-6" data-title="Adafruit Metro ESP32-S2 Pinout" data-footer="Attribution-ShareAlike Creative Commons - Kattni Rembor">
            <img src="../../assets/images/devices/adafruit_products_Adafruit_Metro_ESP32-S2_pinout.png" class="img-fluid">
        </a>
</div>

[1]: https://www.waveshare.com/2.8inch-TFT-Touch-Shield.htm
[2]: https://www.waveshare.com/3.5inch-tft-touch-shield.htm
[3]: https://www.waveshare.com/4inch-TFT-Touch-Shield.htm
[4]: https://www.aliexpress.com/item/32919729730.html
[5]: https://www.aliexpress.com/item/32848833474.html
[6]: https://www.wemos.cc/en/latest/d1_mini_shield/tft_2_4.html
[7]: https://www.wemos.cc/en/latest/_static/files/sch_tft2.4_v1.0.0.pdf
[8]: https://www.waveshare.com/catalogsearch/result/?q=Touch+LCD+Shield+for+Arduino