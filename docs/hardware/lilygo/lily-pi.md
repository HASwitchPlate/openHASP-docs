# LilyGO® Lily Pi

<div class="row justify-content-center">
        <a href="../images/lily-pi-front.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-6" data-title="LILYGO® Lily Pi" data-footer="">
            <img src="../images/lily-pi-front.jpg" class="img-fluid">
        </a>
        <a href="../images/lily-pi-side.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-6" data-title="LILYGO® Lily Pi" data-footer="">
            <img src="../images/lily-pi-side.jpg" class="img-fluid">
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

The RTC and SD card are not supported by openHASP {< openhasp.version >}.

## Models

{!hardware/lilygo/lilygo-lily-pi-table.html!}


## Video

<div class="embed-responsive embed-responsive-16by9" style="max-width:560px; margin:auto;">
    <iframe title="YouTube video player" src="https://www.youtube.com/embed/kRTFc2vY5A8?rel=0&controls=1" class="embed-responsive-item" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
    </iframe>
</div>


## Backlight Control

The GPIO that controls the backlight is `GPIO12`.


## Documentation

The Lily Pi comes with the following information cards describing all the GPIOs used:
<div class="row justify-content-center">
        <a href="../images/lily-pi-gpio-left.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-6" data-title="LILYGO® Lily Pi" data-footer="">
            <img src="../images/lily-pi-gpio-left.jpg" class="img-fluid">
        </a>
        <a href="../images/lily-pi-gpio-right.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-6" data-title="LILYGO® Lily Pi" data-footer="">
            <img src="../images/lily-pi-gpio-right.jpg" class="img-fluid">
        </a>
</div>


## Flashing

The LilyGO Lily Pi can easily be flashed over USB like any ESP32 development board.

## Dimensions

Size: 99.7 x 62.5 x 31.2mm

