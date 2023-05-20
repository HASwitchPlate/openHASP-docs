# GS-T3E :material-new-box:{ .tag-large }

<div class="row justify-content-center">
        <a href="../images/gs-t3e-left.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-6" data-title="GS-T3E front" data-footer="">
            <img src="../images/gs-t3e-left.jpg" class="img-fluid">
        </a>

        <a href="../images/gs-t3e-right.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-6" data-title="GS-T3E front" data-footer="">
            <img src="../images/gs-t3e-right.jpg" class="img-fluid">
        </a>
</div>

## Models

- EU model: 3 gang relay switch
- CN model: 4 gang relay switch

Only the PCB revision v2.3 (20221205) is supported by openHASP.
Specify that you want the new device with PCB revision v2.3 when ordering from known vendor Golden Security on Alibaba.

!!! warning
    Do **NOT** buy PCB revision v1.23 (20220817) because the internal antenna connector is **NOT** soldered onto the board.

    Those devices will have no WiFi reception on the ESP32! This version is now discontinued, but some sellers might have old stock.


#### Form factor

- EU model: 86mm x 86mm
- CN model: info not available

<div class="row justify-content-center">
    <a href="../images/gs-t3e-dimensions-eu.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-8" data-title="GS-T3E EU dimensions" data-footer="">
        <img src="../images/gs-t3e-dimensions-eu.jpg" class="img-fluid">
    </a>
</div>

Maximum load is 200W per gang, 600W in total EU version.

The models have the same recessed housing sliding into the wall, sized 50x50mm, with rounded corners creating a diameter of about 59mm. This makes them suitable for both EU and UK wall fixtures. The EU model fits in a properly deployed, standard 60mm round wall box and can be fixed with two side screws (use the screws which belong to the box instead of the ones shipped with the device).

The CN model has not been tested yet.



#### Features:

- Input voltage 110-250V ~ 50-60Hz AC
- ESP32-S3-WROOM-1 (Xtensa-LX7 dual core 240MHz)
- 8 MB PSram - Octal SPI
- 16 MB flash - Quad SPI
- Capacitive GT911 touch screen

| Pros           | Cons
|:-----          |:----
| 8 MB flash     | Tuya device with ZS3L Tuya chip on PCB (unused)
| 16 MB PSram    | Flash header pins not populated
| 480x480 HD IPS LCD |
| Capactitive touch |
| Built-in PSU |
| Standard wallmount form factor both EU and UK |

[:material-cart-variant: Buy][1]{target=_blank .md-button .md-button--primary }

!!! note
    openHASP does **not** support the proprietary Tuya chip, but you can still flash the firmware
    and use the other GS-T3E features just fine.


## Packaging

<div class="row justify-content-center">
        <a href="../images/gs-t3e-box.png" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-5" data-title="GS-T3E packaging" data-footer="">
            <img src="../images/gs-t3e-box.png" class="img-fluid">
        </a>
        <a href="../images/gs-t3e-contents.png" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-5" data-title="GS-T3E Contents" data-footer="">
            <img src="../images/gs-t3e-contents.png" class="img-fluid">
        </a>
</div>

## Flashing

!!! warning "Disclaimer"
    Never connect high-voltage when the panel is not properly secured in place.

<div class="row justify-content-center">
        <a href="../images/gs-t3e-pcb.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-5" data-title="GS-T3E PCB" data-footer="">
            <img src="../images/gs-t3e-pcb.jpg" class="img-fluid">
        </a>
</div>

Device can be flashed by either using the USB port or the flash header pins and a FTDI serial programmer device.

Steps to flash via USB:

1. Disengage the panel from high-voltage power
2. Detach the panel from the PSU power supply
3. Connect Micro USB cable
    - GND <--> GND
    - 5V <--> 5V
    - RX <--> RX &nbsp; *(not reversed!)*
    - TX <--> TX &nbsp; *(not reversed!)*
4. Connect `IO0` to `GND` to activate flash mode!
5. Press the `KEY` button to powercycle (`RESET`) the board


Steps to flash via UART:

1. Disengage the panel from high-voltage power
2. Detach the panel from the PSU power supply
3. Connect jumper wires:
    - GND <--> GND
    - 5V <--> 5V
    - RX <--> RX &nbsp; *(not reversed!)*
    - TX <--> TX &nbsp; *(not reversed!)*
4. Connect `IO0` to `GND` to activate flash mode!
5. Press the `KEY` button to powercycle (`RESET`) the board

Once the connections are made, flash the [GS-T3E ESP32 binary](../../firmware/esp32.md) like on any other device.

## GPIO Settings

### 3-gang EU version GS-T3E

Pin| Mode   | GS-T3E     | Group | Default
---|--------|------------|-------|----
45 | Output | Relay L1   | 1 | Low (Normal)
46 | Output | Relay L2   | 2 | Low (Normal)
44 | Output | Relay L3   | 3 | Low (Normal)


!!! tip
    To configure the GPIOs _as light switches_ at once for L8-HS send to topic `hasp/<nodename>/config/gpio` a message with payload:  
    ```json linenums="1"
    {"config":[197658,263456,329249,655628,655886,656155,0,0]}
    ```
    Or for _power switches_:
    ```json linenums="1"
    {"config":[721164,721422,197658,721691,263456,329249,0,0]}
    ```
    The difference is only the device class you want them to be autodetected as in Home Assistant: _light_ vs. _switch_


??? example "Example `jsonl`"
    To create a page displaying the local relays as switches, try this very simple [pages.jsonl](../../design/pages.md):
    ```json linenums="1"
    {"page":1,"id":1,"obj":"switch","x":30,"y":40,"w":180,"h":75,"radius":40,"radius20":40,"groupid":1}
    {"page":1,"id":2,"obj":"switch","x":30,"y":122,"w":180,"h":75,"radius":40,"radius20":40,"groupid":2}
    {"page":1,"id":3,"obj":"switch","x":30,"y":205,"w":180,"h":75,"radius":40,"radius20":40,"groupid":3}
    ```
    ![lanbon-3-switch-display](images/lanbon-3-switch-display.png)


## Wiring Diagram

The switch supports this wiring configuration:

<div class="row justify-content-center">
        <a href="../images/gs-t3e-wiring.png" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-5" data-title="GS-T3E wiring" data-footer="">
            <img src="../images/gs-t3e-wiring.png" class="img-fluid">
        </a>
</div>

!!! danger "Warning"
    Always follow the instructions from the installation guide and local safety regulations.
    Consult a licensed electrician when changing your electrical wiring.</br>

## Product Video

<div class="row justify-content-center">
    <div class="col-sm-8">
        <video controls style="display:block; margin:auto;" 
            <source src="https://video01.alibaba.com/vod-icbu/4f4e1c368ac918af/3978a2de2f053d59/20220921_d6db1fad7b100f03_377788337177_mp4_264_sd_unlimit_taobao.mp4?w=960&h=540&e=sd" type="video/mp4">Your browser does not support the video tag.
        </video>
    </div>
</div>


## Gallery

<div class="row justify-content-center">
    <a href="../images/gs-t3e.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-3" data-title="GS-T3E front" data-footer="">
        <img src="../images/gs-t3e.jpg" class="img-fluid">
    </a>

    <a href="../images/gs-t3e-back.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-3" data-title="GS-T3E Smart Switch" data-footer="Lanbon L8 in operation as a 5-cover commander">
        <img src="../images/gs-t3e-back.jpg" class="img-fluid">
    </a>
    <a href="../images/gs-t3e-side.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-3" data-title="GS-T3E Smart Switch" data-footer="Lanbon L8 in operation as sensors and switches panel">
        <img src="../images/gs-t3e-side.jpg" class="img-fluid">
    </a>
    <a href="../images/gs-t3e-demo.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-3" data-title="GS-T3E Smart Switch" data-footer="Customized Lanbon L8 Switchplate">
        <img src="../images/gs-t3e-demo.jpg" class="img-fluid">
    </a>
</div>

[1]: https://www.alibaba.com/product-detail/2022-new-arrival-smart-wifi-switch_1600573806214.html
