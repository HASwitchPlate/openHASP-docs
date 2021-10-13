# Lilygo Lily Pi

<div class="row justify-content-center">
        <a href="../../assets/images/devices/lily-pi-front.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-6" data-title="LILYGO® Lily Pi" data-footer="">
            <img src="../../assets/images/devices/lily-pi-front.jpg" class="img-fluid">
        </a>
        <a href="../../assets/images/devices/lily-pi-side.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-6" data-title="LILYGO® Lily Pi" data-footer="">
            <img src="../../assets/images/devices/lily-pi-side.jpg" class="img-fluid">
        </a>
</div>


## Features

   - ESP32-WROVER
   - ILI9481 or ST7796 3.5" (480*320) TFT screen in 4-wire SPI mode
   - FT6X36 or GT911 Capacitive Touch Controller
   - CP2104 USB-to-UART IC
   - USB-C connector
   - DC 5-12V barrel jack (5.5x2.1mm)
   - Relay HFD3 5V 2A
   - microSD card holder
   - Real Time Clock PCF8563
   - Battery voltage divider connected to GPIO35
   - GPIO output via USB-A type connectors

The Lily Pi is designed to resemble the Raspberry Pi appearance. The PCB layout and ports also mimmicks the Rasberry Pi.
There is even the familiar 2x20 expansion port inside that match the Raspberry Pi GPIO pinout.
Some Rpi expansion boards *could* work on this PCB too depending on the pins used.

| Pros              | Cons
|:-----             |:----
| 480x320 display   | Non-standard USB-A connectors as GPIO
| 16 MB flash
| 8 MB PSram
| Capacitive Touchscreen

The RTC and SD card are not supported by openHASP 0.6.1.

Available from:</br>
[:material-cart-variant: AliExpress][1]{target=_blank .md-button .md-button--primary } &nbsp; 
[:material-cart-variant: Tindie][2]{target=_blank .md-button .md-button--primary }


## Backlight Control

The GPIO that controls the backlight is `GPIO12`.


## Documentation

The Lily Pi comes with the following information cards describing all the GPIOs used:
<div class="row justify-content-center">
        <a href="../../assets/images/devices/lily-pi-gpio-left.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-6" data-title="LILYGO® Lily Pi" data-footer="">
            <img src="../../assets/images/devices/lily-pi-gpio-left.jpg" class="img-fluid">
        </a>
        <a href="../../assets/images/devices/lily-pi-gpio-right.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-6" data-title="LILYGO® Lily Pi" data-footer="">
            <img src="../../assets/images/devices/lily-pi-gpio-right.jpg" class="img-fluid">
        </a>
</div>


## Flashing

The Lilygo Lily Pi can easily be flashed over USB like any ESP32 development board.

## Dimensions

Size: 99.7 x 62.5 x 31.2mm


[1]: https://s.click.aliexpress.com/e/_9I2hQ9
[2]: https://www.tindie.com/products/lilygo/lilygo-lily-pi-esp32-wifi-bluetooth-35-inch/
