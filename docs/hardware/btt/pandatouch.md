# Panda Touch :material-new-box:{ .tag-large }

<div class="row justify-content-center">
        <a href="../images/panda-touch-front.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-6" data-title="Panda Touch front" data-footer="">
            <img src="../images/panda-touch-front.jpg" class="img-fluid">
        </a>

        <a href="../images/panda-touch-dock.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-6" data-title="Panda Touch magnetic dock" data-footer="">
            <img src="../images/panda-touch-dock.jpg" class="img-fluid">
        </a>
</div>

## Models

- **Panda Touch Standalone**: 5" touchscreen display with magnetic charging dock.
- **Panda Touch + Sense Pack**: Includes the integrated environmental sensor suite expansion.

The main control board uses an ESP32-S3 chip and is fully compatible with custom openHASP layouts for home automation and 3D printer monitoring.

!!! warning
    Ensure you use a high-quality 5V/2A power supply for the magnetic dock. Insufficient current can cause display flickering or brownout loops when charging the internal battery while running openHASP.


#### Form factor

- Screen dimensions: 130mm x 85mm x 20mm
- Charging Dock: Magnetic alignment base with rear-facing USB-C power input.

<div class="row justify-content-center">
    <a href="../images/panda-touch-dimensions.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-8" data-title="Panda Touch dimensions" data-footer="">
        <img src="../images/panda-touch-dimensions.jpg" class="img-fluid">
    </a>
</div>

Unlike standard wall-mount panels, the Panda Touch includes an integrated lithium battery, enabling portable handheld operation away from its magnetic base dock. 

The **Sense module** version expands the rear profile to house integrated localized ambient sensors, feeding hardware metrics directly back to openHASP or your Home Assistant instance.


#### Features:

- Input voltage: 5V DC via USB-C or Magnetic Dock Pins
- ESP32-S3 (Xtensa-LX7 dual core 240MHz)
- 8 MB PSRAM
- 16 MB Flash
- 5.0" Capacitive Touch Display (800x480 resolution)
- Built-in structural magnets and charging logic
- Integrated ambient sensors (Sense Module edition)

| Pros           | Cons
|:-----          |:----
| 5.0" Large 800x480 Display | Consumes more power due to screen scale
| Magnetic quick-release dock | Battery life is limited when un-docked
| Built-in battery backup | Proprietary sensor expansion layout
| Capacitive multi-touch |
| USB-C Native flashing |

[:material-cart-variant: Buy][1]{target=_blank .md-button .md-button--primary }

!!! note
    When running openHASP, the stock Bambu Lab monitoring UI is replaced. You can pull printer stats from your instance into custom openHASP pages via Home Assistant's MQTT integration.


## Packaging

<div class="row justify-content-center">
        <a href="../images/panda-touch-box.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-5" data-title="Panda Touch packaging" data-footer="">
            <img src="../images/panda-touch-box.jpg" class="img-fluid">
        </a>
        <a href="../images/panda-touch-contents.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-5" data-title="Panda Touch Contents" data-footer="">
            <img src="../images/panda-touch-contents.jpg" class="img-fluid">
        </a>
</div>


## Flashing

!!! warning "Disclaimer"
    Always power down the device and disconnect any external power sources before popping open the enclosure shell to access interior development pads.

The Panda Touch can be flashed easily using its onboard USB-C port, bypassing the need for an external FTDI programmer.

Steps to flash via USB-C:

1. Turn off the device using the physical power switch.
2. Connect the device to your computer using a data-capable USB-C cable.
3. Hold down the physical **BOOT (IO0)** button hidden inside the pinhole access slot.
4. Press or flip the **POWER/RESET** toggle to power up the device while holding BOOT.
5. Release the BOOT button; the device is now in USB flashing mode.

Once the connection is established, flash the firmware binary via the [openHASP Web Flasher](../../firmware/esp32.md) or standard ESP tools.


## GPIO & Sensor Settings

Because the Panda Touch functions as an interactive terminal rather than a mains switch, the GPIOs are assigned to internal display interfaces and expansion sensors instead of high-voltage relays.

### Onboard Hardware Peripherals

Pin| Mode   | Component  | Group | Default
---|--------|------------|-------|----
-- | Output | LCD Backlight | 1     | PWM Variable
-- | Input  | Battery ADC   | 2     | Analog Voltage Read

### Sense Module Expansion (I2C)

The Sense module communicates metrics back via an internal I2C bus channel breakout:

Pin    | Mode   | Designation  | Bus / Type
-------|--------|--------------|-------
GPIO-- | I2C SDA| Sensor Data  | Shared Bus
GPIO-- | I2C SCL| Sensor Clock | Shared Bus

!!! tip
    To forward environmental data directly from your Panda Touch Sense module to Home Assistant, ensure your openHASP configuration template has the appropriate I2C sensor drivers enabled to broadcast over the `hasp/<nodename>/state/sensors` MQTT topic.


??? example "Example Dashboard `jsonl`"
    To build a clean, dark-themed 800x480 monitoring page utilizing the large layout area of the Panda Touch, try this simple setup in your [pages.jsonl](../../design/pages.md):
    ```json linenums="1"
    {"page":1,"id":1,"obj":"label","x":20,"y":20,"w":760,"h":40,"text":"Panda Touch Command Center","align":1}
    {"page":1,"id":2,"obj":"btn","x":60,"y":100,"w":200,"h":120,"text":"Living Room Light"}
    {"page":1,"id":3,"obj":"btn","x":300,"y":100,"w":200,"h":120,"text":"Printer Power"}
    {"page":1,"id":4,"obj":"lmeter","x":560,"y":100,"w":180,"h":180,"min":0,"max":100,"val":45}
    ```
    ![panda-touch-display-layout](images/panda-touch-layout.jpg)


## Wiring & Dock Connections

The unit derives power cleanly from its 5V magnetic pins or via direct line input:

<div class="row justify-content-center">
        <a href="../images/panda-touch-dock-wiring.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-5" data-title="Dock Power Wiring" data-footer="">
            <img src="../images/panda-touch-dock-wiring.jpg" class="img-fluid">
        </a>
</div>


## Product Video

<div class="row justify-content-center">
    <div class="col-sm-8">
        <video controls style="display:block; margin:auto;"> 
            <source src="https://example.com/btt-panda-touch-overview.mp4" type="video/mp4">Your browser does not support the video tag.
        </video>
    </div>
</div>


## Gallery

<div class="row justify-content-center">
    <a href="../images/gallery-panda-1.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-3" data-title="Panda Touch Handheld" data-footer="">
        <img src="../images/gallery-panda-1.jpg" class="img-fluid">
    </a>
    <a href="../images/gallery-panda-2.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-3" data-title="Panda Touch on Dock" data-footer="Mounted alongside 3D printer frame">
        <img src="../images/gallery-panda-2.jpg" class="img-fluid">
    </a>
    <a href="../images/gallery-panda-3.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-3" data-title="Sense Module Profile" data-footer="Rear view with sensor expansion slot">
        <img src="../images/gallery-panda-3.jpg" class="img-fluid">
    </a>
</div>


## Discussions

[GitHub Discussion](https://github.com/HASwitchPlate/openHASP/discussions/983)

[1]: https://s.click.aliexpress.com/e/_c3i9PFrt