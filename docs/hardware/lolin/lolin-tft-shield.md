# Lolin TFT 2.4" Touch Shield

<div class="row justify-content-center">
        <a href="../images/lolin-tft-shield-front.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-6" data-title="TFT 2.4&quot; Touch Shield" data-footer="">
            <img src="../images/lolin-tft-shield-front.jpg" class="img-fluid">
        </a>
        <a href="../images/lolin-tft-shield-back.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-6" data-title="TFT 2.4&quot; Touch Shield" data-footer="">
            <img src="../images/lolin-tft-shield-back.jpg" class="img-fluid">
        </a>
</div>

## Features

This Lolin TFT has a 2.4" touchscreen with XPT2046 resistive touch controller.
There are 3 ways to connect an ESP32:

1. Plug a compatible ESP32 onto the female headers on the back
2. Attach a [LOLIN D32 Pro V2.0][3]{target=_blank} using the 10-pin TFT connector and cable
3. Solder headers onto the bottom pinholes for pluging into a breadboard or jumper cables for any other ESP32

| Pros                       | Cons
|:-----                      |:----
| Plug-and-play              | Resistive touchscreen
| Limited soldering required | Availability
| Choice of several ESP32 MCUs |
| Price |

[:material-cart-variant: Buy][4]{target=_blank .md-button .md-button--primary }


## Compatible ESP32 dev boards

The Lolin TFT 2.4" headers are plug-and-play compatible with these development boards, no need to use any jumper cables:

| Model                   | Minimal | Better | Best
|-------------------------|:-------:|:-------:|:--------:
| SKU                     | [D1 Mini ESP32][1]{target=_blank} | [TTGO T7 V1.5 Mini32][2]{target=_blank} | [Lolin D32 Pro V2.0][3]{target=_blank}
| MCU                     | ESP32-WROOM | ESP32-WROVER | ESP32-WROVER
| Flash                   | 4 MB    | 4 or 16 MB| 4 or 16 MB
| PSram                   | No      | 8 MB      | 8 MB
| Connection              | Two 1x8 Pinheaders² | Two 1x8 Pinheaders² | [10-pin TFT cable][5]{target=_blank} *(optional)*
| SD Card                 | no | no | :white_check_mark: yes
| Battery charging        | no | :white_check_mark: yes | :white_check_mark: yes
| USB Chip                | | CH9102F | CH340C
| Screen dimming      | :white_check_mark: yes | :white_check_mark: yes | :white_check_mark: yes   
| | [:material-cart-variant: Buy][1]{target=_blank .md-button .md-button--primary } | [:material-cart-variant: Buy][2]{target=_blank .md-button .md-button--primary } | [:material-cart-variant: Buy][3]{target=_blank .md-button .md-button--primary }

!!! warning
    The D1 Mini ESP32 board may suffer from brown-out reboots if not powered adequately.

!!! note
    (²) Because the board is developed for the D1-mini, you must *only* solder a row of 1x8 male pins to pads `TXD-5V` and `RST-3V3` each.


## Product Video

<div class="embed-responsive embed-responsive-16by9" style="max-width:560px; margin:auto;">
    <iframe title="YouTube video player" src="https://www.youtube.com/embed/bNdo3G_vKTY?rel=0&controls=1" class="embed-responsive-item" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
    </iframe>
</div>

## Backlight Control

To use PWM dimming on the Lolin TFT 2.4" you must bridge the center TFT-LED pin to the D1 solder pad next to it.
This pin is configured by default in the firmware.

![TFT-LED PWM dimming](../images/tft-led-pwm.png)

!!! warning
    Do *not* use D3 for backlight control because it is already in use for touch!</br>
    Do *not* use D4 for backlight control because it is already in use for PSram on the ESP32-WROVER.</br>
    The D1-mini has D4 connected to the on-board LED and boot fails if pulled LOW.


## Documentation

[:material-book-open-page-variant: Wemos Wiki][6]{target=_blank .md-button } &nbsp;
[:fontawesome-regular-file-pdf: Schematics][7]{target=_blank .md-button }


## Dimensions

![PCB Dimensions](../images/lolin-24-tft-shield-dimensions.jpg)


[1]: https://www.aliexpress.com/item/32815530502.html
[2]: https://www.aliexpress.com/item/32977375539.html
[3]: https://www.aliexpress.com/item/32883116057.html
[4]: https://www.aliexpress.com/item/32919729730.html
[5]: https://www.aliexpress.com/item/32848833474.html
[6]: https://www.wemos.cc/en/latest/d1_mini_shield/tft_2_4.html
[7]: https://www.wemos.cc/en/latest/_static/files/sch_tft2.4_v1.0.0.pdf