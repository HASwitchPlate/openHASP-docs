# AZ-Touch Feather

<div class="row justify-content-center">
        <a href="../images/az-touch-feather-front.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-6" data-title="Assembled AZ-Touch Feather" data-footer="Copyright <a href='https://www.az-delivery.de/'>az-delivery.de,</a> All Rights Reserved - Used with permission">
            <img src="../images/az-touch-feather-front.jpg" class="img-fluid">
        </a>
        <a href="../images/az-touch-feather-back.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-6" data-title="AZ-Touch Feather after soldering all components" data-footer="Copyright <a href='https://www.az-delivery.de/'>az-delivery.de,</a> All Rights Reserved - Used with permission">
            <img src="../images/az-touch-feather-back.jpg" class="img-fluid">
        </a>
</div>

The AZ-Touch Feather also uses a 2.8" TFT display but the footprint on the PCB is only suitable for the [Adafruit Feather family][2]{target=_blank} of MCUs.
This AZ-Touch Feather kit can also be used to run openHASP with the HUZZAH32 or SparkFun Thing Plus ESP32-WROOM development boards.

**Unlike the AZ-Touch MOD, the AZ-Touch Feather is a self-solder kit!**  You have to solder *all* components to the PCB yourself.
For this reason the [AZ-Touch MOD](#az-touch-mod) is recommended over the AZ-Touch Feather.

| Pros                         | Cons
|:-----                        |:----
| Versatile PCB options        | All components need soldering
| Choice of several ESP32 MCUs | Bulky enclosure
| 9 to 35V DC-DC power input   | Resistive touchpanel
| Breadboard area

[:material-cart-variant: AZ-Touch Feather][1]{target=_blank .md-button .md-button--primary }

## Feather dev boards

We do not offer pre-built binaries for the AZ-Touch Feather yet but these dev boards *should* work:

| Board                   | [HUZZAH32][9]{target=_blank} | [SparkFun Thing Plus][10]{target=_blank}
|-------------------------|:-----------:|:-----------:|
| MCU                     | ESP32-WROOM | ESP32-WROOM
| Flash                   | 4 MB        | 16 MB
| PSram                   | No          | No
|  | [:material-cart-variant: Buy][9]{target=_blank .md-button .md-button--primary } | [:material-cart-variant: Buy][10]{target=_blank .md-button .md-button--primary }


## Documentation

[:fontawesome-solid-file-pdf: Schematics][11]{target=_blank .md-button .md-button } &nbsp;
[:fontawesome-regular-file-pdf: Datasheet][12]{target=_blank .md-button .md-button } &nbsp;
[:fontawesome-regular-file-pdf: Assembly Guide][13]{target=_blank .md-button .md-button }


## Backlight Control

`GPIO13` of the ESP32 is used for PWM dimming of the AZ-Touch Feather display.


## Enclosure

Each AZ-Touch kit comes with a nice wall mounting enclosure for the 2.4&quot; or 2.8&quot; touchscreen.
It enables you to mount your project permanently in your living room, corridor or other exposed places.

The AZ-Touch Feather contains loose components that you need to solder to the PCB yourself using the [Assembly Guide](#documentation_1).

<div class="row justify-content-center">
        <a href="../images/az-touch-feather-contents.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-6" data-title="AZ-Touch Feather Contents" data-footer="Copyright <a href='https://www.az-delivery.de/'>az-delivery.de,</a> All Rights Reserved - Used with permission">
            <img src="../images/az-touch-feather-contents.jpg" class="img-fluid">
        </a>
</div>

The wall mounted enclosure measures 120mm x 80mm x 35mm (W x H x D).


## Flashing

The ESP32 can be flashed over USB like any ESP32 development board.


[1]: https://www.az-delivery.de/en/products/az-touch-feather
[2]: https://learn.adafruit.com/adafruit-feather
[3]: https://www.az-delivery.de/en/products/esp-32-dev-kit-c-v4
[4]: https://www.amazon.com/Espressif-ESP32-DevKitC-VE-Development-Board/dp/B087TNPQCV
[5]: https://www.az-delivery.de/en/blogs/azdelivery-blog-fur-arduino-und-raspberry-pi/az-touch-mod
[6]: https://www.hwhardsoft.de/app/download/11868165697/AZ-Touch+MOD+schematic+V01-03-01.pdf
[7]: https://www.hwhardsoft.de/app/download/11868164297/Datasheet+AZ-Touch+MOD+Rev+B.pdf
[8]: https://www.hwhardsoft.de/app/download/11467519097/Assembly+Instruction+ArduiTouch+ESP+rev+D.pdf
[9]: https://www.adafruit.com/product/3591
[10]: https://www.sparkfun.com/products/15663
[11]: https://www.hwhardsoft.de/app/download/11963381497/AZ-Touch+Feather+Schematic+V01-01.pdf
[12]: https://www.hwhardsoft.de/app/download/11963714197/Datasheet+AZ-Touch+Feather+Rev+A.pdf
[13]: https://www.hwhardsoft.de/app/download/11963380797/Assembly+Instruction+AZ-Touch+Feather+rev+A.pdf
[14]: https://www.az-delivery.de/en/products/az-touch-wandgehauseset-mit-touchscreen-fur-esp8266-und-esp32
[15]: https://www.az-delivery.de/en/products/az-touch-wandgehauseset-mit-2-8-zoll-touchscreen-fur-esp8266-und-esp32