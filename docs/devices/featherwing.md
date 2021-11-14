# Adafruit Featherwing

<div class="row justify-content-center">
    <a href="../../assets/images/devices/featherwing24.png" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-6" data-title="<a href='https://learn.adafruit.com/3d-printed-case-for-adafruit-feather/tft-feather-wing'>Adafruit Featherwing 2.4&quot;</a>" data-footer="Original image by <a href='https://learn.adafruit.com/assets/40718'>Ruiz Brothers</a> - LICENSE: <a href='https://creativecommons.org/licenses/by-sa/3.0/'>Attribution-ShareAlike Creative Commons</a>">
        <img src="../../assets/images/devices/featherwing24.png" class="img-fluid">
    </a>
    <a href="https://cdn-learn.adafruit.com/assets/assets/000/100/822/original/3d_printing_td-0749.jpg?1616461141" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-6" data-title="<a href='https://learn.adafruit.com/touch-deck-diy-tft-customized-control-pad/assemble-the-touch-deck'>Adafruit Featherwing 3.5&quot;</a>" data-footer="Original image by <a href='https://learn.adafruit.com/assets/100822'>John Park</a> - LICENSE: <a href='http://creativecommons.org/licenses/by-nc-sa/3.0/'>Attribution-NonCommercial-ShareAlike Creative Commons</a>">
        <img src="https://cdn-learn.adafruit.com/assets/assets/000/100/822/original/3d_printing_td-0749.jpg?1616461141" class="img-fluid">
    </a>
</div>

You can run openHASP on the Adafruit HUZZAH32 – ESP32 Feather Board with a TFT Featherwing display.
We provide pre-build firmware for this hardware combo. You can pick the 2.4" or 3.5" touchscreen.

The HUZZAH32 – ESP32 Feather Boards come in 3 versions:

- [No headers soldered](https://www.adafruit.com/product/3405)
- [Headers pre-soldered](https://www.adafruit.com/product/3591)
- [Stacking headers pre-soldered](https://www.adafruit.com/product/3619)

The TFT Featherwing comes in 2 sizes:

- [TFT FeatherWing - 2.4" 320x240 Touchscreen](https://www.adafruit.com/product/3315): ILI9341 with STMPE610 resistive touch
- [TFT FeatherWing - 3.5" 480x320 Touchscreen](https://www.adafruit.com/product/3651): HX8357D with STMPE610 resistive touch

!!! note "<i class='fa fa-info-circle'></i>&nbsp; Note" 
    Don't use the ESP8266 based Feather HUZZAH because it lacks both in memory and MCU power.

The Huzzah32 boards only have 4MB flash. If you want more storage, consider getting the SparkFun Thing Plus ESP32-WROOM instead.

## Instructions

The HUZZAH32 – ESP32 and TFT Featherwings are plug-and-play. You only need to upload the firmware via the USB port.
If you get a version with pre-soldered headers then no soldering is required to get started!

Check out the Adafruit [TFT Featherwing tutorial](https://learn.adafruit.com/adafruit-2-4-tft-touch-screen-featherwing) on learn.adafruit.com.
It contains more detailed information, tutorials and wiring diagrams.

## Backlight

By default the display is always on. To get the dimmable backlight working you *do* need to solder 2 pads!
There is a `Lite` pin which is not connected to any pads but you can connect it to control the backlight.
You can connect it to a PWM output pin, like `GPIO 21`:

<div class="row justify-content-center">
            <a href="https://raw.githubusercontent.com/HASwitchPlate/openHASP-docs/master/docs/assets/images/devices/featherwing35-backlight.png" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-8" data-title="Backlight Control" data-footer="Original image by altersis">
                <img src="../../assets/images/devices/featherwing35-backlight.png" class="img-fluid">
            </a>
</div>

## Product Video

#### 2.4" TFT Featherwing

<div class="embed-responsive embed-responsive-16by9" style="max-width:560px; margin:auto;">
    <iframe title="YouTube video player" src="https://www.youtube.com/embed/0JUA1IHCI-o?start=630&end=0&rel=0&controls=1" class="embed-responsive-item" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
    </iframe>
</div>

#### 3.5" TFT Featherwing

<div class="embed-responsive embed-responsive-16by9" style="max-width:560px; margin:auto;">
    <iframe title="YouTube video player" src="https://www.youtube.com/embed/Wt_QXeipqpk?start=268&end=0&rel=0&controls=1" class="embed-responsive-item" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
    </iframe>
</div>

## 3D Printed Case

Check out these enclosures, the designs are available on Thingiverse:

- [2.4" TFT Feather Wing Enclosure](https://learn.adafruit.com/3d-printed-case-for-adafruit-feather/tft-feather-wing){target=_blank}
- [2.4" TFT Feather Wing Weather Station](https://www.thingiverse.com/thing:1944905){target=_blank}
- [3.5" TFT Featherwing table top case](https://www.thingiverse.com/thing:2776163){target=_blank}
- [3.5" TFT Featherwing Touch Deck](https://www.thingiverse.com/thing:4803265){target=_blank}

<div class="row justify-content-center">
    <a href="https://raw.githubusercontent.com/HASwitchPlate/openHASP-docs/master/docs/assets/images/devices/3d_printing_done-assembly.gif" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-4" data-title="<a href='https://learn.adafruit.com/3d-printed-case-for-adafruit-feather/tft-feather-wing'>TFT Feather Wing Enclosure</a>" data-footer="Original image by <a href='https://learn.adafruit.com/assets/40717'>Ruiz Brothers</a> - LICENSE: <a href='https://creativecommons.org/licenses/by-sa/3.0/'>Attribution-ShareAlike Creative Commons</a>">
        <img src="../../assets/images/devices/3d_printing_done-assembly.gif" class="img-fluid">
    </a>
    <a href="https://cdn-learn.adafruit.com/assets/assets/000/100/924/original/3d_printing_touchdeck.gif?1616540216" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-4" data-title="<a href='https://learn.adafruit.com/touch-deck-diy-tft-customized-control-pad/assemble-the-touch-deck'>Adafruit Featherwing 3.5&quot; Touch Deck</a>" data-footer="Original image by <a href='https://learn.adafruit.com/assets/100924'>John Park</a> - LICENSE: <a href='http://creativecommons.org/licenses/by-nc-sa/3.0/'>Attribution-NonCommercial-ShareAlike Creative Commons</a>">
        <img src="https://cdn-learn.adafruit.com/assets/assets/000/100/924/original/3d_printing_touchdeck.gif?1616540216" class="img-fluid">
    </a>
</div>


!!! info "About Adafruit"
    *Adafruit invests time and resources providing open source code and libraries,
    please support Adafruit and open-source hardware by purchasing products from Adafruit!*