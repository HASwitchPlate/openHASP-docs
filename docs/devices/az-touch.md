# AZ-Touch

<div class="row justify-content-center">
        <a href="../../assets/images/devices/az-touch-mod-24.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-6" data-title="AZ-Touch wall enclosure set with 2.4&quot; touchscreen" data-footer="Copyright <a href='https://www.az-delivery.de/'>az-delivery.de,</a> All Rights Reserved - Used with permission">
            <img src="../../assets/images/devices/az-touch-mod-24.jpg" class="img-fluid">
        </a>
        <a href="../../assets/images/devices/az-touch-mod-28.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-6" data-title="AZ-Touch wall enclosure set with 2.8&quot; touchscreen" data-footer="Copyright <a href='https://www.az-delivery.de/'>az-delivery.de,</a> All Rights Reserved - Used with permission">
            <img src="../../assets/images/devices/az-touch-mod-28.jpg" class="img-fluid">
        </a>
</div>
<div>
        <a href="../../assets/images/devices/az-touch-pcb-front.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-6" data-title="Assembled AZ-Touch PCB" data-footer="Copyright <a href='https://www.az-delivery.de/'>az-delivery.de,</a> All Rights Reserved - Used with permission">more images...</a>
        <a href="../../assets/images/devices/az-touch-pcb-back.jpg" data-toggle="lightbox" data-gallery="example-gallery" rel="lightbox[work]" data-title="AZ-Touch Top PCB with headers" data-footer="Copyright <a href='https://www.az-delivery.de/'>az-delivery.de,</a> All Rights Reserved - Used with permission"></a>
        <a href="../../assets/images/devices/az-touch-pcb-back.jpg" data-toggle="lightbox" data-gallery="example-gallery" rel="lightbox[vacation]" data-title="AZ-Touch Bottom PCB with MCU" data-footer="Copyright <a href='https://www.az-delivery.de/'>az-delivery.de,</a> All Rights Reserved - Used with permission"></a>
        <a href="../../assets/images/devices/az-touch-pcb-side.jpg" data-toggle="lightbox" data-gallery="example-gallery" rel="lightbox[vacation]" data-title="AZ-Touch PCB Side View" data-footer="Copyright <a href='https://www.az-delivery.de/'>az-delivery.de,</a> All Rights Reserved - Used with permission"></a>
</div>

## AZ-Touch MOD

The AZ-Touch MOD for ESP32 comes as kit with a touchscreen, wall enclosure, PCB and pinheaders.
It includes either a 2.4" or 2.8" ILI9341 display with a XPT2046 resistive touchscreen controller.
The PCB is pre-soldered *except* for the pinheaders, so [some soldering][5]{target=_blank} is required.

| Pros                         | Cons
|:-----                        |:----
| Versatile PCB options        | Bulky enclosure
| Limited soldering required   | Resistive touchpanel
| Choice of several ESP32 MCUs
| 9 to 35V DC-DC power input
| Integrated piezo beeper
| Breadboard area

[:material-cart-variant: AZ-Touch MOD 2.4&quot;][14]{ .md-button .md-button--primary }{target=_blank} &nbsp;
[:material-cart-variant: AZ-Touch MOD 2.8&quot;][15]{ .md-button .md-button--primary }{target=_blank}

### ESP32 dev boards

The AZ-Touch MOD PCB kit does *not* come with an MCU and needs to be purchased seperately.
The PCB is designed to be compatible with serveral development boards.

There are two ESP32 footprint options for soldering headers onto the PCB:

1. ESP32-DevKitC footprint with `2x19` pins
2. Wemos D1 mini footprint with `2x8` pins

The ESP32-DevKitC option is prefered because you can use more pins from the ESP32.

| Board                   | [ESP32-DevKitC-V4][3]{target=_blank} | [ESP32-DevKitC-VE][4]{target=_blank}
|-------------------------|:-----------:|:-----------:|
| MCU                     | ESP32-WROOM | ESP32-WROVER
| Flash                   | 4 MB        | 8 MB
| PSram                   | No          | 8 MB
|  | [:material-cart-variant: Buy][3]{ .md-button .md-button--primary }{target=_blank} | [:material-cart-variant: Buy][4]{ .md-button .md-button--primary }{target=_blank}

### Documentation

[:fontawesome-solid-file-pdf: Schematics][6]{ .md-button .md-button }{target=_blank} &nbsp;
[:fontawesome-regular-file-pdf: Datasheet][7]{ .md-button .md-button }{target=_blank} &nbsp;
[:fontawesome-regular-file-pdf: Assembly Guide][11]{ .md-button .md-button }{target=_blank}


## AZ-Touch Feather

<div class="row justify-content-center">
        <a href="../../assets/images/devices/az-touch-feather-front.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-6" data-title="Assembled AZ-Touch Feather" data-footer="Copyright <a href='https://www.az-delivery.de/'>az-delivery.de,</a> All Rights Reserved - Used with permission">
            <img src="../../assets/images/devices/az-touch-feather-front.jpg" class="img-fluid">
        </a>
        <a href="../../assets/images/devices/az-touch-feather-back.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-6" data-title="AZ-Touch Feather PCB" data-footer="Copyright <a href='https://www.az-delivery.de/'>az-delivery.de,</a> All Rights Reserved - Used with permission">
            <img src="../../assets/images/devices/az-touch-feather-back.jpg" class="img-fluid">
        </a>
</div>

The AZ-Touch Feather also uses a 2.8" TFT display, but the footprint on the PCB is only suitable for the [Adafruit Feather family][2]{target=_blank} of MCUs. This AZ-Touch Feather kit can also be used to run openHASP with the HUZZAH32 or SparkFun Thing Plus ESP32-WROOM development boards.

[:material-cart-variant: AZ-Touch Feather][1]{ .md-button .md-button--primary }{target=_blank}

### Feather dev boards

| Board                   | [HUZZAH32][9]{target=_blank} | [SparkFun Thing Plus][10]{target=_blank}
|-------------------------|:-----------:|:-----------:|
| MCU                     | ESP32-WROOM | ESP32-WROOM
| Flash                   | 4 MB        | 16 MB
| PSram                   | No          | No
|  | [:material-cart-variant: Buy][9]{ .md-button .md-button--primary }{target=_blank} | [:material-cart-variant: Buy][10]{ .md-button .md-button--primary }{target=_blank}


### Documentation

[:fontawesome-solid-file-pdf: Schematics][11]{ .md-button .md-button }{target=_blank} &nbsp;
[:fontawesome-regular-file-pdf: Datasheet][12]{ .md-button .md-button }{target=_blank} &nbsp;
[:fontawesome-regular-file-pdf: Assembly Guide][13]{ .md-button .md-button }{target=_blank}


## Product Video

<div class="embed-responsive embed-responsive-16by9" style="max-width:560px; margin:auto;">
    <iframe title="YouTube video player" src="https://www.youtube.com/embed/k7ngHp8WKIM?rel=0&controls=1" class="embed-responsive-item" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
    </iframe>
</div>

## Backlight Control

`GPIO15` of the ESP32 is used for PWM dimming of the AZ-Touch MOD display.

`GPIO13` of the ESP32 is used for PWM dimming of the AZ-Touch Feather display.


## Enclosure

The AZ-Touch kits come with a nice wall mounting enclosure for the 2.4&quot; or 2.8&quot; touchscreen.
It enables you to mount your project permanently in your living room, corridor or other exposed places. 

<div class="row justify-content-center">
        <a href="../../assets/images/devices/arduitouch-contents.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-6" data-title="AZ-Touch MOD Contents" data-footer="Copyright <a href='https://www.az-delivery.de/'>az-delivery.de,</a> All Rights Reserved - Used with permission">
            <img src="../../assets/images/devices/arduitouch-contents.jpg" class="img-fluid">
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