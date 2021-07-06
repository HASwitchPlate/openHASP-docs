# ESP32 Lolin TFT 2.4" Touch Shield

<div class="row justify-content-center">
        <a href="https://raw.githubusercontent.com/HASwitchPlate/openHASP-docs/master/docs/assets/images/devices/esp32-touchdown.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-6" data-title="ESP32 TouchDown" data-footer="Original image by Dustin Watts - Used with permission">
            <img src="../../assets/images/devices/esp32-touchdown.jpg" class="img-fluid">
        </a>

        <a href="https://raw.githubusercontent.com/HASwitchPlate/openHASP-docs/master/docs/assets/images/devices/esp32-touchdown-color_wheel.png" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-6" data-title="ESP32 TouchDown" data-footer="Original image by Dustin Watts - Used with permission">
            <img src="../../assets/images/devices/esp32-touchdown-color_wheel.png" class="img-fluid">
        </a>
</div>
<div>
        <a href="https://raw.githubusercontent.com/HASwitchPlate/openHASP-docs/master/docs/assets/images/devices/esp32-touchdown-usbc.jpg" data-toggle="lightbox" data-gallery="example-gallery" rel="lightbox[work]" data-title="ESP32 TouchDown" data-footer="Original image by Dustin Watts - Used with permission">more images...</a>
        <a href="https://raw.githubusercontent.com/HASwitchPlate/openHASP-docs/master/docs/assets/images/devices/esp32-touchdown-speaker.jpg" data-toggle="lightbox" data-gallery="example-gallery" rel="lightbox[vacation]" data-title="ESP32 TouchDown" data-footer="Original image by Dustin Watts - Used with permission"></a>
        <a href="https://raw.githubusercontent.com/HASwitchPlate/openHASP-docs/master/docs/assets/images/devices/esp32-touchdown-sdcard.jpg" data-toggle="lightbox" data-gallery="example-gallery" rel="lightbox[vacation]" data-title="ESP32 TouchDown" data-footer="Original image by Dustin Watts - Used with permission"></a>
        <a href="https://raw.githubusercontent.com/HASwitchPlate/openHASP-docs/master/docs/assets/images/devices/esp32-touchdown-features.png" data-toggle="lightbox" data-gallery="example-gallery" rel="lightbox[vacation]" data-title="ESP32 TouchDown" data-footer="Original image by Dustin Watts - Used with permission"></a>
</div>

## TFT 2.4" Touch Shield

This Lolin TFT has a 2.4" touchscreen with XPT2046 resistive touch controller.
There are 3 ways to connect an ESP32:

1. Plug a compatible ESP32 onto the female headers on the back
2. Attach a [LOLIN D32 Pro V2.0][3] using the 10-pin TFT connector and cable
3. Solder headers onto the bottom pinholes for pluging into a breadboard or jumper cables for any other ESP

| Pros                       | Cons
|:-----                      |:----
| Plug-and-play              | Resistive touchscreen
| Limited soldering required | Availability
| Choice of several ESP32 MCUs |
| Price |

[:material-cart-variant: Buy][4]{ .md-button .md-button--primary }


## ESP32 dev boards

The Lolin TFT 2.4" headers are plug-and-play compatible with these development boards, no need to use any jumper cables:

| Model                   | Minimal | Better | Best
|-------------------------|:-------:|:-------:|:--------:
| SKU                     | [D1 Mini ESP32][1] | [TTGO T7 V1.5 Mini32 ESP32][2] | [Lolin D32 Pro V2.0][3]
| MCU                     | ESP32-WROOM | ESP32-WROVER | ESP32-WROVER
| Flash                   | 4 MB    | 4 MB   | 4 or 16 MB
| PSram                   | No      | 8 MB    | 8 MB
| Connection              | Two 1x8 Pinheaders² | Two 1x8 Pinheaders² | [10-pin TFT cable][5] *(optional)*
| SD Card                 | no | no | :white_check_mark: yes
| Battery charging        | no | :white_check_mark: yes | :white_check_mark: yes
| USB Chip                | | CH9102F | CH340C
| PWM Screen dimming      | :white_check_mark: yes | :white_check_mark: yes | :white_check_mark: yes   
| | [:material-cart-variant: Buy][1]{ .md-button .md-button--primary } | [:material-cart-variant: Buy][2]{ .md-button .md-button--primary } | [:material-cart-variant: Buy][3]{ .md-button .md-button--primary }

!!! warning
    The D1 Mini ESP32 board may suffer from brown-out reboots if not powered adequately.

!!! note
    (²) Because the board is developed for the D1-mini, you must *only* solder a row of 1x8 male pins to pads `TXD-5V` and `RST-3V3` each.


## Product Video

![YOUTUBE](bNdo3G_vKTY)


## Backlight Control

To use PWM dimming on the Lolin TFT 2.4" you must connect the TFT-LED pin to either D1 or D2.
**D1 is recommended** for backlight control and configured by default in the firmware.

![TFT-LED PWM dimming](../assets/images/tft-led-pwm.png)

!!! warning
    Do *not* use D3 for backlight control because it is already in use for touch!</br>
    Do *not* use D4 for backlight control because it is already in use for PSram on the ESP32-WROVER,
    also the D1-mini has D4 connected to the on-board LED and boot fails if pulled LOW


## 3D Printed Cases

You can find several different [3D printable cases](https://github.com/DustinWatts/esp32-touchdown/tree/main/Case) in the [ESP32 TouchDown repository](https://github.com/DustinWatts/esp32-touchdown/):


## Flashing

The ESP32 can be flashed over USB like any ESP32 development board.


## Documentation

[:material-book-open-page-variant: Wemos Wiki][6]{ .md-button .md-button } &nbsp;
[:material-file-pdf-outline: Schematics][7]{ .md-button .md-button }


## Dimensions

![PCB Dimensions](../assets/images/devices/lolin-24-tft-shield-dimensions.jpg)


[1]: https://www.aliexpress.com/item/32815530502.html
[2]: https://www.aliexpress.com/item/32977375539.html
[3]: https://www.aliexpress.com/item/32883116057.html
[4]: https://www.aliexpress.com/item/32919729730.html
[5]: https://www.aliexpress.com/item/32848833474.html
[6]: https://www.wemos.cc/en/latest/d1_mini_shield/tft_2_4.html
[7]: https://www.wemos.cc/en/latest/_static/files/sch_tft2.4_v1.0.0.pdf