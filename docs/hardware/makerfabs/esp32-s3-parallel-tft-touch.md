# ESP32-S3 Parallel TFT with Touch

<div class="row justify-content-center">
        <a href="../images/makerfabs-front.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-6" data-title="ESP32 3.5&quot; TFT Touch with Camera - Front" data-footer="Copyright &copy; 2021, Makerfabs, All Rights Reserved">
            <img src="../images/makerfabs-front.jpg" class="img-fluid">
        </a>

        <a href="../images/makerfabs-back.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-6" data-title="ESP32 3.5&quot; TFT Touch with Camera - Back" data-footer="Copyright &copy; 2021, Makerfabs, All Rights Reserved">
            <img src="../images/makerfabs-back.jpg" class="img-fluid">
        </a>
</div>
<div>
        <a href="../images/makerfabs-side-front.jpg" data-toggle="lightbox" data-gallery="example-gallery" rel="lightbox[work]" data-title="Makerfabs ESP32 TFT Touch" data-footer="Copyright &copy; 2021, Makerfabs, All Rights Reserved">more images...</a>
        <a href="../images/makerfabs-side-back.jpg" data-toggle="lightbox" data-gallery="example-gallery" rel="lightbox[vacation]" data-title="Makerfabs ESP32 TFT Touch" data-footer="Copyright &copy; 2021, Makerfabs, All Rights Reserved"></a>
        <a href="../images/makerfabs-sensors.jpg" data-toggle="lightbox" data-gallery="example-gallery" rel="lightbox[vacation]" data-title="Makerfabs ESP32 TFT Touch" data-footer="Copyright &copy; 2021, Makerfabs, All Rights Reserved"></a>
</div>


## Features

The Makerfabs ESP32-S3 Parallel TFT Touch development board incorporates a 3.5” or 4.3” capacitive touch display
which makes it a very suitable platform for any openHASP project.

At the back sits an ESP32-S3-WROOM module with 16MB of flash and PSram.
There is also an SD-card slot, USB-C connectors and two expansion ports.

## Models

| Model                   | 3.5" Parallel | 4.0" Parallel | 4.3" Parallel
|-------------------------|:-------:|:-------:|:-------:|
| SKU                     | [ESP32S335D][1]{target=_blank} | [E32S3RGB40][2]{target=_blank} | [E32S3RGB43][3]{target=_blank}
| Flash                   | 16 MB   | 16 MB   | 16 MB
| PSram                   | 2 MB    | 8 MB    | 8 MB
| Display                 | 3.5" 480x320 | 4.0" IPS | 4.3" IPS
| Resolution              | 480x320 | 480x480 | 800x480
| Touch Screen            | Capacitive | Capacitive | Capacitive
| SD Card                 | :white_check_mark: yes | :white_check_mark: yes | :white_check_mark: yes
| Real Time Clock         | :x: no   | :x: no   | :white_check_mark: yes
| [Screen dimming][11]    | :white_check_mark: `GPIO45` | :white_check_mark: `GPIO2` | :white_check_mark: `GPIO2`
| | [:material-cart-variant: Buy][1]{target=_blank .md-button .md-button--primary } | [:material-cart-variant: Buy][2]{target=_blank .md-button .md-button--primary } | [:material-cart-variant: Buy][3]{target=_blank .md-button .md-button--primary }

Also available on [:material-cart-variant: Tindie][10]{target=_blank .md-button .md-button--primary }

The real-time clock and SD card are not supported by openHASP {< openhasp.version >}.


## Backlight Control

The backlight can be controlled by PWM on pin `GPIO45` of the 3.5".

The backlight can be controlled by PWM on pin `GPIO02` of the 4.3".


## Video

### ESP32-S3 Parallel TFT with Touch 3.5'' ILI9488

<div class="embed-responsive embed-responsive-16by9" style="max-width:560px; margin:auto;">
    <iframe title="YouTube video player" src="https://www.youtube.com/embed/ZWtTmmne6Bo?rel=0&controls=1" class="embed-responsive-item" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
    </iframe>
</div>

### ESP32-S3 Parallel TFT with Touch 4.0"

<div class="embed-responsive embed-responsive-16by9" style="max-width:560px; margin:auto;">
    <iframe title="YouTube video player" src="https://www.youtube.com/embed/L5ttJ9GTVLc?rel=0&controls=1" class="embed-responsive-item" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
    </iframe>
</div>

### ESP32-S3 Parallel TFT with Touch 4.3"

<div class="embed-responsive embed-responsive-16by9" style="max-width:560px; margin:auto;">
    <iframe title="YouTube video player" src="https://www.youtube.com/embed/dMVBIOXZ-1I?rel=0&controls=1" class="embed-responsive-item" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
    </iframe>
</div>

## Documentation

More information can be found in the Makerfabs Wiki and there are plenty of example projects available on the Github repository.

[:material-book-open-page-variant: Makerfabs Wiki][6]{target=_blank .md-button } &nbsp;
[:material-github: Github Repo][5]{target=_blank .md-button } &nbsp;
[:fontawesome-regular-file-pdf: Schematics][12]{target=_blank .md-button }

## Enclosure

We don't have any 3D printable enclosure yet to share here.
If you have a case for this board, please let us know so we can share it here.


[1]: https://www.makerfabs.com/esp32-s3-parallel-tft-with-touch-ili9488.html
[2]: https://www.makerfabs.com/esp32-s3-parallel-tft-with-touch-4-inch.html
[3]: https://www.makerfabs.com/esp32-s3-parallel-tft-with-touch-4-3-inch.html
[4]: https://www.makerfabs.com/esp32-touch-indoor-environment-expansion.html
[5]: https://github.com/Makerfabs/
[6]: https://www.makerfabs.com/wiki/index.php?title=ESP32_TFT_LCD_with_Camera(3.5%27%27)
[7]: https://www.tindie.com/stores/makerfabs/items/
[8]: https://www.tindie.com/stores/makerfabs/items/
[10]: https://www.tindie.com/stores/makerfabs/items/
[11]: #backlight-control
[12]: https://www.makerfabs.com/wiki/images/6/67/ESP32_TFT_Touch_with_camera%283.5%27%27_ili9488%29_sch.pdf