# Adafruit

<div class="row justify-content-center">
  <a href="../images/featherwing24.png" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-6" data-title="<a href='https://learn.adafruit.com/3d-printed-case-for-adafruit-feather/tft-feather-wing' target='_blank'>Adafruit Featherwing 2.4&quot;</a>" data-footer="Original image by <a href='https://learn.adafruit.com/assets/40718' target='_blank'>Ruiz Brothers</a> - LICENSE: <a href='https://creativecommons.org/licenses/by-sa/3.0/' target='_blank'>Attribution-ShareAlike Creative Commons</a>">
    <img src="../images/featherwing24.png" class="img-fluid">
  </a>
  <a href="../images/featherwing35.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-6" data-title="<a href='https://learn.adafruit.com/touch-deck-diy-tft-customized-control-pad/assemble-the-touch-deck' target='_blank'>Adafruit Featherwing 3.5&quot;</a>" data-footer="Original image by <a href='https://learn.adafruit.com/assets/100822' target='_blank'>John Park</a> - LICENSE: <a href='http://creativecommons.org/licenses/by-nc-sa/3.0/' target='_blank'>Attribution-NonCommercial-ShareAlike Creative Commons</a>">
    <img src="../images/featherwing35.jpg" class="img-fluid">
  </a>
</div>

openHASP runs on Adafruit's ESP32 Feather Boards and supports Adafruit's TFT Featherwing resistive touch screens. Build configurations and precompiled firmware binaries are available for these popular hardware combinations to help you get started quickly.

## Supported Boards

openHASP supports the following Adafruit Feather boards (and the many different versions and variations based on them):

- Adafruit HUZZAH32 - ESP32 Feather (4MB Flash, No PSRAM)
- Adafruit ESP32-S3 Feather (4MB Flash, 2MB PSRAM)
- Adafruit ESP32 Feather V2 (8MB Flash, 2MB PSRAM)

These boards are virtually plug-and-play when combined with Adafruit TFT FeatherWing displays. Many of these boards come in versions with pre-soldered headers (no soldering required).

!!! warning
    Don't use the Adafruit ESP8266-based Feather HUZZAH as it lacks both sufficient memory and MCU power.

!!! note
    Boards with PSRAM are highly recommended, and required for image processing.

## Supported Displays

- TFT FeatherWing - 2.4" 320x240 Touchscreen *(ILI9341 with STMPE610 resistive touch)*
- [TFT FeatherWing - 2.4" 320x240 Touchscreen V2](https://www.adafruit.com/product/3315){target=_blank} *(ILI9341 with TSC2007 resistive touch)*
- TFT FeatherWing - 3.5" 480x320 Touchscreen *(HX8357D with STMPE610 resistive touch)*
- [TFT FeatherWing - 3.5" 480x320 Touchscreen V2](https://www.adafruit.com/product/3651){target=_blank} *(HX8357D with TSC2007 resistive touch)*

<div class="row justify-content-center">
  <a href="../images/feather_3405_iso_ORIG.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-4" data-title="<a href='https://learn.adafruit.com/3d-printed-case-for-adafruit-feather/tft-feather-wing' target='_blank'>TFT Feather Wing Enclosure</a>" data-footer="Original image by <a href='https://learn.adafruit.com/users/adafruit2' target='_blank'>lady ada</a> - All rights reserved">
   <img src="../images/feather_3405_iso_ORIG.jpg" class="img-fluid">
  </a>
  <a href="../images/feather_3591_iso_ORIG.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-4" data-title="<a href='https://learn.adafruit.com/3d-printed-case-for-adafruit-feather/tft-feather-wing' target='_blank'>TFT Feather Wing Enclosure</a>" data-footer="Original image by <a href='https://learn.adafruit.com/users/adafruit2' target='_blank'>lady ada</a> - All rights reserved">
    <img src="../images/feather_3591_iso_ORIG.jpg" class="img-fluid">
  </a>
  <a href="../images/feather_3619_iso_ORIG.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-4" data-title="<a href='https://learn.adafruit.com/3d-printed-case-for-adafruit-feather/tft-feather-wing' target='_blank'>TFT Feather Wing Enclosure</a>" data-footer="Original image by <a href='https://learn.adafruit.com/users/adafruit2' target='_blank'>lady ada</a> - All rights reserved">
    <img src="../images/feather_3619_iso_ORIG.jpg" class="img-fluid">
  </a>
</div>

Check out Adafruit's [TFT Featherwing tutorial](https://learn.adafruit.com/adafruit-2-4-tft-touch-screen-featherwing){target=_blank} on [learn.adafruit.com](https://learn.adafruit.com/){target=_blank} for detailed information and wiring diagrams.

## Backlight

By default, the display is always on and at its maximum brightness. To control backlight dimming or sleeping, you need to solder the `LITE` pad on the TFT Featherwing to a PWM output pin on the Feather board (e.g., `GPIO 21` on the Adafruit HUZZAH32 - ESP32 Feather or `GPIO 37` on the Adafruit ESP32 Feather V2, as these are, respectively, the closest pins to the `LITE` pad).

<div class="row justify-content-center">
  <a href="../images/featherwing35-backlight.png" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-8" data-title="Backlight Control" data-footer="Original image by altersis">
    <img src="../images/featherwing35-backlight.png" class="img-fluid">
  </a>
</div>

## Product Videos

#### 2.4" TFT FeatherWing

<div class="embed-responsive embed-responsive-16by9" style="max-width:560px; margin:auto;">
  <iframe title="YouTube video player" src="https://www.youtube.com/embed/0JUA1IHCI-o?start=630&end=0&rel=0&controls=1" class="embed-responsive-item" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

#### 2.4" TFT FeatherWing V2

<div class="embed-responsive embed-responsive-16by9" style="max-width:560px; margin:auto;">
  <iframe src="https://www.youtube.com/embed/tzbzjBJtPRQ?si=ZMKchMxkdbYuRPEF" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

#### 3.5" TFT FeatherWing

<div class="embed-responsive embed-responsive-16by9" style="max-width:560px; margin:auto;">
  <iframe title="YouTube video player" src="https://www.youtube.com/embed/Wt_QXeipqpk?start=268&end=0&rel=0&controls=1" class="embed-responsive-item" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

#### 3.5" TFT FeatherWing V2

<div class="embed-responsive embed-responsive-16by9" style="max-width:560px; margin:auto;">
  <iframe src="https://www.youtube.com/embed/h3zfPu5WHqk?si=2Q0JnpU36zkOPwuY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

## 3D Printed Cases

Check out these enclosures available on Thingiverse:

- [2.4" TFT FeatherWing Enclosure](https://learn.adafruit.com/3d-printed-case-for-adafruit-feather/tft-feather-wing){target=_blank}
- [2.4" TFT FeatherWing Weather Station](https://www.thingiverse.com/thing:1944905){target=_blank}
- [3.5" TFT FeatherWing Table Top Case](https://www.thingiverse.com/thing:2776163){target=_blank}
- [3.5" TFT FeatherWing Touch Deck](https://www.thingiverse.com/thing:4803265){target=_blank}

<div class="row justify-content-center">
  <a href="../images/3d_printing_done-assembly.gif" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-4" data-title="<a href='https://learn.adafruit.com/3d-printed-case-for-adafruit-feather/tft-feather-wing' target='_blank'>TFT Feather Wing Enclosure</a>" data-footer="Original image by <a href='https://learn.adafruit.com/assets/40717' target='_blank'>Ruiz Brothers</a> - LICENSE: <a href='https://creativecommons.org/licenses/by-sa/3.0/' target='_blank'>Attribution-ShareAlike Creative Commons</a>">
    <img src="../images/3d_printing_done-assembly.gif" class="img-fluid">
  </a>
  <a href="../images/3d_printing_touchdeck.gif" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-4" data-title="<a href='https://learn.adafruit.com/touch-deck-diy-tft-customized-control-pad/assemble-the-touch-deck' target='_blank'>Adafruit Featherwing 3.5&quot; Touch Deck</a>" data-footer="Original image by <a href='https://learn.adafruit.com/assets/100924' target='_blank'>John Park</a> - LICENSE: <a href='http://creativecommons.org/licenses/by-nc-sa/3.0/' target='_blank'>Attribution-NonCommercial-ShareAlike Creative Commons</a>">
    <img src="../images/3d_printing_touchdeck.gif" class="img-fluid">
  </a>
</div>


!!! info "About Adafruit"
    *Adafruit invests time and resources providing open source code and libraries,
    please support Adafruit and open-source hardware by purchasing products from Adafruit!*
