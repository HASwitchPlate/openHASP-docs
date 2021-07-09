# Makerfabs ESP32 TFT Touch

<div class="row justify-content-center">
        <a href="../../assets/images/devices/makerfabs-front.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-6" data-title="ESP32 3.5&quot; TFT Touch with Camera - Front" data-footer="Copyright &copy; 2021, Makerfabs, All Rights Reserved">
            <img src="../../assets/images/devices/makerfabs-front.jpg" class="img-fluid">
        </a>

        <a href="../../assets/images/devices/makerfabs-back.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-6" data-title="ESP32 3.5&quot; TFT Touch with Camera - Back" data-footer="Copyright &copy; 2021, Makerfabs, All Rights Reserved">
            <img src="../../assets/images/devices/makerfabs-back.jpg" class="img-fluid">
        </a>
</div>
<div>
        <a href="../../assets/images/devices/makerfabs-side-front.jpg" data-toggle="lightbox" data-gallery="example-gallery" rel="lightbox[work]" data-title="Makerfabs ESP32 TFT Touch" data-footer="Copyright &copy; 2021, Makerfabs, All Rights Reserved">more images...</a>
        <a href="../../assets/images/devices/makerfabs-side-back.jpg" data-toggle="lightbox" data-gallery="example-gallery" rel="lightbox[vacation]" data-title="Makerfabs ESP32 TFT Touch" data-footer="Copyright &copy; 2021, Makerfabs, All Rights Reserved"></a>
        <a href="../../assets/images/devices/makerfabs-sensors.jpg" data-toggle="lightbox" data-gallery="example-gallery" rel="lightbox[vacation]" data-title="Makerfabs ESP32 TFT Touch" data-footer="Copyright &copy; 2021, Makerfabs, All Rights Reserved"></a>
</div>


## Features

The Makerfabs ESP32 TFT Touch development board incorporates a 3.2” or 3.5” touch display, with a built-in 2M pixel OV2640 camera,
which makes it a very suitable platform for any ESP32 project. There is a version with capacitive and resistive touch.

At the back sits an ESP32-WROVER module with 16MB of flash and 8MB of PSram.
There is also an SD-card slot, USB-C connector and expansion port with 14 GPIOs.

### Models

| Model                   | 3.2" Resistive | 3.5" Resistive | 3.5" Capacitive
|-------------------------|:-------:|:-------:|:--------:
| SKU                     | [ESPTFT32CA][1]{target=_blank} | [ESPTFT35RE][2]{target=_blank} | [ESPTFT35CA][3]{target=_blank}
| Flash                   | 16 MB   | 16 MB   | 16 MB
| PSram                   | 8 MB    | 8 MB    | 8 MB
| Resolution              | 3.2" 320x240 | 3.5" 480x320 | 3.5" 480x320
| Touch Screen            | Resistive | Resistive | Capacitive
| OV2640 Camera           | 2M pixel | 2M pixel | 2M pixel
| SD Card                 | :white_check_mark: yes | :white_check_mark: yes | :white_check_mark: yes
| [Screen dimming][11]    | :x: no    | :x: no    | :x: no
| | [:material-cart-variant: Buy][1]{target=_blank .md-button .md-button--primary } | [:material-cart-variant: Buy][2]{target=_blank .md-button .md-button--primary } | [:material-cart-variant: Buy][3]{target=_blank .md-button .md-button--primary }

Also available on [:material-cart-variant: Tindie][10]{target=_blank .md-button .md-button--primary }

!!! tip
    An optional [environmental expansion board][4]{target=_blank} can be added to provide a temperature, humidity and air quality sensor.
    The camera can not be used at the same time as the expansion port.

The camera and SD card are not supported by openHASP 0.6.1.


## Backlight Control

Unfortunately, there is no support for backlight control. The display is always-on.


## Video

<div class="embed-responsive embed-responsive-16by9" style="max-width:560px; margin:auto;">
    <iframe title="YouTube video player" src="https://www.youtube.com/embed/kkXKwpDRld0?rel=0&controls=1" class="embed-responsive-item" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
    </iframe>
</div>

## Documentation

More information can be found in the Makerfabs Wiki and there are plenty of example projects available on the Github repository.

[:material-book-open-page-variant: Makerfabs Wiki][6]{target=_blank .md-button .md-button } &nbsp;
[:material-github: Github Repo][5]{target=_blank .md-button .md-button } &nbsp;
[:material-github: Schematics][12]{target=_blank .md-button .md-button }

## Acrylic Case

All 3 models have the option to add a protective acrylic case for only $2.90 extra:

<div class="row justify-content-center">
        <a href="../../assets/images/devices/makerfabs-case-front.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-6" data-title="ESP32 3.5&quot; TFT Touch with Camera - Front" data-footer="Copyright &copy; 2021, Makerfabs, All Rights Reserved">
            <img src="../../assets/images/devices/makerfabs-case-front.jpg" class="img-fluid">
        </a>

        <a href="../../assets/images/devices/makerfabs-case-back.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-6" data-title="ESP32 3.5&quot; TFT Touch with Camera - Back" data-footer="Copyright &copy; 2021, Makerfabs, All Rights Reserved">
            <img src="../../assets/images/devices/makerfabs-case-back.jpg" class="img-fluid">
        </a>
</div>


[1]: https://www.makerfabs.com/esp32-3.2-inch-tft-touch-with-camera.html
[2]: https://www.makerfabs.com/esp32-3.5-inch-tft-touch-resistive-with-camera.html
[3]: https://www.makerfabs.com/esp32-3.5-inch-tft-touch-capacitive-with-camera.html
[4]: https://www.makerfabs.com/esp32-touch-indoor-environment-expansion.html
[5]: https://github.com/Makerfabs/Project_Touch-Screen-Camera
[6]: https://www.makerfabs.com/wiki/index.php?title=ESP32_TFT_LCD_with_Camera(3.5%27%27)
[7]: https://www.tindie.com/products/makerfabs/esp32-32-tft-touch-with-camera/
[8]: https://www.tindie.com/products/makerfabs/esp32-35-tft-touchresistive-with-camera/
[9]: https://www.tindie.com/products/makerfabs/esp32-35-tft-touchcapacitive-with-camera/
[10]: https://www.tindie.com/stores/makerfabs/items/
[11]: #backlight-control
[12]: https://www.makerfabs.com/wiki/images/6/67/ESP32_TFT_Touch_with_camera%283.5%27%27_ili9488%29_sch.pdf