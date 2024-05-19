# CrowPanel - HMI RGB :material-new-box:{ .tag-large }

<div class="row justify-content-center">
        <a href="../images/crowpanel-hmi-rgb43-front.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-4" data-title="CrowPanel 4.3&quot; - HMI ESP32 Display" data-footer="©Copyright 2012 - 2024 ELECROW All rights reserved.">
            <img src="../images/crowpanel-hmi-rgb43-front.jpg" class="img-fluid">
        </a>
        <a href="../images/crowpanel-hmi-rgb50-front.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-4" data-title="CrowPanel 5.0&quot; - HMI ESP32 Display" data-footer="©Copyright 2012 - 2024 ELECROW All rights reserved.">
            <img src="../images/crowpanel-hmi-rgb50-front.jpg" class="img-fluid">
        </a>
        <a href="../images/crowpanel-hmi-rgb70-front.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-4" data-title="CrowPanel 7.0&quot; - HMI ESP32 Display" data-footer="©Copyright 2012 - 2024 ELECROW All rights reserved.">
            <img src="../images/crowpanel-hmi-rgb70-front.jpg" class="img-fluid">
        </a>
</div>

The CrowPanel HMI RGB range comes in three different size: 4.3", 5.0" and 7.0". All three models have a touchscreen and integrated ESP32-S3 module with built-in wireless communication 2.4 GHz Wi-Fi (802.11 b/g/n) and Bluetooth 5.0.

## Models

| Model                   | 4.3" RGB  | 5.0" RGB  | 7.0" RGB
|-------------------------|:---------:|:---------:|:---------:|
| SKU                     | [DIS06043H][1]{target=_blank} | [DIS07050H][2]{target=_blank} | [ DIS08070H][3]{target=_blank}
| MCU                     | ESP32-S3-Wroom | ESP32-S3-Wroom | ESP32-S3-Wroom
| Flash                   | 4 MB    | 4 MB    | 4 MB
| PSram                   | 2 MB    | 8 MB    | 8 MB
| Resolution              | 480x272 | 800x480 | 800x480
| Touch Screen            | Resistive | Capacitive | Capacitive
| SD Card                 | :white_check_mark: yes | :white_check_mark: yes | :white_check_mark: yes
| Screen dimming          | :white_check_mark: yes | :white_check_mark: yes | :white_check_mark: yes
| | [:material-cart-variant: Buy][1]{target=_blank .md-button .md-button--primary } | [:material-cart-variant: Buy][2]{target=_blank .md-button .md-button--primary } | [:material-cart-variant: Buy][3]{target=_blank .md-button .md-button--primary }

The audio port and SD card are not supported by openHASP {< openhasp.version >}.


__ESP32-S3__ Modules have __PSram__ and are more suitable for loading fonts, and graphics.


## Video

### Elecrow ESP32 Touch Screen TFT Display 5" VS 7"

<div class="embed-responsive embed-responsive-16by9" style="max-width:560px; margin:auto;">
    <iframe title="YouTube video player" src="https://www.youtube.com/embed/i8AWqLOEmfk?rel=0&controls=1" class="embed-responsive-item" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
    </iframe>
</div>


## Cases

You can order the display either with or without matching acrylic case.

## Flashing

Compile your own via platform.io and `platformio_override.ini` environment templates.

Also available via web installer at <a target="_blank" href="https://nightly.openhasp.com/">https://nightly.openhasp.com/</a>

or the latest found under <a target="_blank" href="https://github.com/HASwitchPlate/openHASP/actions">Github Actions</a>, click on the latest action, and look under the `Assets` sections for zip files containing builds binary files.

### Recommended method

   1. Use the `Nightly` build website to initially flash the device.

   2. Then update with the OTA file found under `Actions`, `Assets` on github.  Or compile your own if comfortable doing that.


[1]: https://s.click.aliexpress.com/e/_DCxftv3
[2]: https://s.click.aliexpress.com/e/_DBxXUF7
[3]: https://s.click.aliexpress.com/e/_DDATG5T