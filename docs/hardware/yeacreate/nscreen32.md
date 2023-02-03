# YeaCreate Nscreen32

<div class="row justify-content-center">
    <a href="../images/nscreen32-1.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-4" data-title="Nscreen32 Front" data-footer="Copyright &copy; 2017-2021 YeaCreate - All Rights Reserved.">
        <img src="../images/nscreen32-1.jpg" class="img-fluid">
    </a>

    <a href="../images/nscreen32-2.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-4" data-title="Nscreen32 Back" data-footer="Copyright &copy; 2017-2021 YeaCreate - All Rights Reserved.">
        <img src="../images/nscreen32-2.jpg" class="img-fluid">
    </a>

    <a href="../images/nscreen32-3.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-4" data-title="Nscreen32 Front" data-footer="Copyright &copy; 2017-2021 YeaCreate - All Rights Reserved.">
        <img src="../images/nscreen32-3.jpg" class="img-fluid">
    </a>
</div>


## Features

The Nscreen32 uses an ESP32-WROVER-IE module with a large 4-inch capacitive touch display.
The display is connected via an 8-bit parallel bus resulting in a fast performance.
openHASP can take advantage of the 320x480 resolution to show a large custom user-interface.

On the back there is an expansion port with 6 GPIOs (4 input only, RX & TX) so you add inputs if needed.
The development board can be powered via micro USB or the 5V-in JST connector.

| Pros                     | Cons
|:-----                    |:----
| 8-bit parallel display   | No backlight control 
| 16 MB flash + 8 MB PSram | Bright white power LED
| Capacitive Touchscreen
| Viewing angles
| External antenna

[:material-cart-variant: YeaCreate Store][1]{target=_blank .md-button .md-button--primary }


## Backlight Control

Unfortunately, there is [no support for backlight control][2]{target=_blank}. The display is always-on.

With a small hack it is possible to control the backlight using a PNP transistor connected to `GPIO0`, `R8` and `3.3V`.

<div class="row justify-content-center">
        <a href="../images/nscreen32-hack.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-6" data-title="Yeacreate Nscreen32 backlight hack" data-footer="Image provided by arovak">
            <img src="../images/nscreen32-hack.jpg" class="img-fluid">
        </a>
</div>

## Documentation

Some example projects and the schematics for the Nscreen32 can be found on the Yeacreate Github repository.

[:material-github: Github Repo][3]{target=_blank .md-button } &nbsp;
[:fontawesome-regular-file-pdf: Schematics][4]{target=_blank .md-button }


## Product Video

Nscreen32 is the first device to receive the LVGL Certified Board label:

<div class="embed-responsive embed-responsive-16by9" style="max-width:560px; margin:auto;">
    <iframe title="YouTube video player" src="https://www.youtube.com/embed/9lDxJRI9BwM?rel=0&controls=1" class="embed-responsive-item" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
    </iframe>
</div>

## Enclosure

We don't have any 3D printable enclosure yet to share here.
If you have a case for this board, please let us know so we can share it here.


[1]: https://store.yeacreate.com/products/3
[2]: https://github.com/yeacreate-opensources/Nscreen_32/issues/2
[3]: https://github.com/yeacreate-opensources/Nscreen_32
[4]: https://github.com/yeacreate-opensources/Nscreen_32/blob/master/documents/Schematic.pdf