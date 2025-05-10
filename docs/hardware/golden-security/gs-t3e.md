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

The PCB revision v2.3 (20221205) and v2.4 (20240909) is known to work with openHASP.
Specify that you want the new device with PCB revision v2.3 or above when ordering from known vendor Golden Security on Alibaba.

!!! warning
    Do **NOT** buy PCB revision v1.23 (20220817) because the internal antenna connector is **NOT** soldered onto the board.

    Those devices will have no WiFi reception on the ESP32! This version is now discontinued, but some sellers might have old stock.


#### Form factor

- EU model: 86mm x 86mm
- CN model (4-gang): 86mm x 86mm.  Rear socket size: 70mm x 70mm x 26mm.

<div class="row justify-content-center">
    <a href="../images/gs-t3e-dimensions-eu.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-8" data-title="GS-T3E EU dimensions" data-footer="">
        <img src="../images/gs-t3e-dimensions-eu.jpg" class="img-fluid">
    </a>
</div>

Maximum load is 200W per gang, 600W in total EU version.

The models have the same recessed housing sliding into the wall, sized 50x50mm, with rounded corners creating a diameter of about 59mm. This makes them suitable for both EU and UK wall fixtures. The EU model fits in a properly deployed, standard 60mm round wall box and can be fixed with two side screws (use the screws which belong to the box instead of the ones shipped with the device).

The 4-gang CN model has a larger recessed housing, sized at 70x70mm with a depth of around 26mm. The two mounting screw holes are 60mm apart. This requires a larger hole in the wall to mount it.



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
3. Connect a Micro USB cable
4. Connect `IO0` to `GND` to activate flash mode!
5. Press the `KEY` button to powercycle (`RESET`) the board


Steps to flash via UART:

### v2.3:

1. Disengage the panel from high-voltage power
2. Detach the panel from the PSU power supply
3. Connect jumper wires:
    - GND <--> GND
    - 5V <--> 5V
    - RX <--> RX &nbsp; *(not reversed!)*
    - TX <--> TX &nbsp; *(not reversed!)*
4. Connect `IO0` to `GND` to activate flash mode!
5. Press the `KEY` button to powercycle (`RESET`) the board

### v2.4:

v2.4 does not have a USB socket. Flashing can be done through flash header PCB holes, by soldering, or using a [2.54mm 6-pin single row pogo pin clamp tool](https://www.aliexpress.com/item/1005006108783889.html).

Connections from PCB to serial programmer:
    - GND <--> GND
    - 5V <--> 5V
    - RX <--> TX
    - TX <--> RX
    - IO0 <--> GND to activate flash mode

<div class="row justify-content-center">
    <a href="../images/gs-t3e-v2.4_flash_header_holes.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-3" data-title="GS-T3E v2.4 flash header holes" data-footer="GS-T3E v2.4 flash header holes">
        <img src="../images/gs-t3e-v2.4_flash_header_holes.jpg" class="img-fluid">
    </a>

    <a href="../images/gs-t3e-v2.4_programming_clamp.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-3" data-title="GS-T3E v2.4 flashing" data-footer="GS-T3E v2.4 flashed using a 6-pin 2.54mm pogo-pin clamp to an FTDI serial programmer">
        <img src="../images/gs-t3e-v2.4_programming_clamp.jpg" class="img-fluid">
    </a>
</div>




Once the connections are made, flash the [GS-T3E ESP32 binary](../../firmware/esp32.md) like on any other device.

## GPIO Settings

### 3-gang EU version GS-T3E

Pin| Mode   | GS-T3E     | Group | Default
---|--------|------------|-------|----
45 | Output | Relay L1   | 1 | Low (Normal)
46 | Output | Relay L2   | 2 | Low (Normal)
44 | Output | Relay L3   | 3 | Low (Normal)


!!! tip
    To configure the GPIOs _as light switches_ at once for GS-T3E send to topic `hasp/<nodename>/config/gpio` a message with payload:  
    ```json linenums="1"
    {"config":[655918,656172,655661,0,0,0,0,0]}
    ```
    Or for _power switches_:
    ```json linenums="1"
    {"config":[721454,721708,721197,0,0,0,0,0]}
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


### 4-gang CN version GS-T3E

Pin    | Mode   | GS-T3E     | Group | Default
-------|--------|------------|-------|----
GPIO1  | Output | Relay L1   | 1 | Low (Normal)
GPIO2  | Output | Relay L2   | 2 | Low (Normal)
GPIO46 | Output | Relay L3   | 3 | Low (Normal)
GPIO45 | Output | Relay L4   | 4 | Low (Normal)



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

    <a href="../images/gs-t3e-back.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-3" data-title="GS-T3E Smart Switch" data-footer="GS-T3E in operation as a 5-cover commander">
        <img src="../images/gs-t3e-back.jpg" class="img-fluid">
    </a>
    <a href="../images/gs-t3e-side.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-3" data-title="GS-T3E Smart Switch" data-footer="GS-T3E in operation as sensors and switches panel">
        <img src="../images/gs-t3e-side.jpg" class="img-fluid">
    </a>
    <a href="../images/gs-t3e-demo.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-3" data-title="GS-T3E Smart Switch" data-footer="Customized GS-T3E Switchplate">
        <img src="../images/gs-t3e-demo.jpg" class="img-fluid">
    </a>
    <a href="../images/gs-t3e-cn-4_gang_relay_board_back.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-3" data-title="GS-T3E CN 4-gang relay board" data-footer="GS-T3E China version 4-gang relay board">
        <img src="../images/gs-t3e-cn-4_gang_relay_board_back.jpg" class="img-fluid">
    </a>
</div>


## Discussions

[https://github.com/HASwitchPlate/openHASP/discussions/458](https://github.com/HASwitchPlate/openHASP/discussions/458)

[1]: https://www.alibaba.com/product-detail/2022-new-arrival-smart-wifi-switch_1600573806214.html
