# Waveshare TFT Touch Shield

<div class="row justify-content-center">
        <a href="../../assets/images/displays/waveshare-touch-shield-28-angle.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-4" data-title="Waveshare 2.8&quot; TFT Touch Shield" data-footer="Copyright © 2021, Waveshare, All Rights Reserved - Used with permission"">
            <img src="../../assets/images/displays/waveshare-touch-shield-28-angle.jpg" class="img-fluid">
        </a>
        <a href="../../assets/images/displays/waveshare-touch-shield-35-side.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-4" data-title="Waveshare 3.5&quot; TFT Touch Shield" data-footer="Copyright © 2021, Waveshare, All Rights Reserved - Used with permission"">
            <img src="../../assets/images/displays/waveshare-touch-shield-35-side.jpg" class="img-fluid">
        </a>
        <a href="../../assets/images/displays/waveshare-touch-shield-40-side.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-4" data-title="Waveshare 4&quot; TFT Touch Shield" data-footer="Copyright © 2021, Waveshare, All Rights Reserved - Used with permission"">
            <img src="../../assets/images/displays/waveshare-touch-shield-40-side.jpg" class="img-fluid">
        </a>
</div>

Waveshare has a line of [TFT Touch Shields for Arduino][8]{target=_blank} which are also plug-and-play compatible with the ESPDUINO-32 *aka.* Wemos “TTGo” D1 R32 board.
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

Please visit the Waveshare Wiki pages for more information, schematics and demo code:

<div class="dropdown show">
    <a class="md-button md-button dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <span class="twemoji">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m19 2-5 4.5v11l5-4.5V2M6.5 5C4.55 5 2.45 5.4 1 6.5v14.66c0 .25.25.5.5.5.1 0 .15-.07.25-.07 1.35-.65 3.3-1.09 4.75-1.09 1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.31 4.75 1.06.1.05.15.03.25.03.25 0 .5-.25.5-.5V6.5c-.6-.45-1.25-.75-2-1V19c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V6.5C10.55 5.4 8.45 5 6.5 5z"></path></svg>
    </span> Waveshare Wiki </a>
    <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
        <a class="dropdown-item md-typeset__table" target="_blank" href="http://www.waveshare.com/wiki/2.8inch_TFT_Touch_Shield">TFT Touch Shield 2.8" Rev 2.1</a>
        <a class="dropdown-item md-typeset__table" target="_blank" href="https://www.waveshare.com/wiki/3.5inch_TFT_Touch_Shield">TFT Touch Shield 3.5"</a>
        <a class="dropdown-item md-typeset__table" target="_blank" href="https://www.waveshare.com/wiki/4inch_TFT_Touch_Shield">TFT Touch Shield 4.0"</a>
    </div>
</div>


## Configuration

!!!note
    By default the DIP switches on the display are set in the `ICSP` position instead of the `SPI` position.

To use the `MISO`, `MOSI` and `SCLK` SPI pins you need to peel of the orange tape that sticks on top of the dip switches.
Then move all 3 DIP switches to the `ON` position with a tiny screwdriver.

The 2.8" model has 3 solder jumpers `SB1`, `SB2` and `SB3` that need to be bridged instead!

<div class="row justify-content-center">
    <a href="../../assets/images/displays/waveshare-touch-shield-40-dimensions.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-6" data-title="SPI Dip Switches" data-footer="Copyright © 2021, Waveshare, All Rights Reserved - Used with permission">
        <img src="../../assets/images/displays/waveshare-touch-shield-40-dimensions.jpg" class="img-fluid">
    </a>
</div>

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