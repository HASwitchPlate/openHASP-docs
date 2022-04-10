# Lanbon L8

<div class="row justify-content-center">
        <a href="../../assets/images/devices/lanbon-l8-us-white.png" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-3" data-title="Lanbon L8 - US white" data-footer="">
            <img src="../../assets/images/devices/lanbon-l8-us-white.png" class="img-fluid">
        </a>

        <a href="../../assets/images/devices/lanbon-l8-us-black.png" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-3" data-title="Lanbon L8 - US black" data-footer="">
            <img src="../../assets/images/devices/lanbon-l8-us-black.png" class="img-fluid">
        </a>

        <a href="../../assets/images/devices/lanbon-l8-eu-white.png" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-3" data-title="Lanbon L8 - EU white" data-footer="">
            <img src="../../assets/images/devices/lanbon-l8-eu-white.png" class="img-fluid">
        </a>

        <a href="../../assets/images/devices/lanbon-l8-eu-black.png" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-3" data-title="Lanbon L8 - EU black" data-footer="">
            <img src="../../assets/images/devices/lanbon-l8-eu-black.png" class="img-fluid">
        </a>
</div>

## Models

- L8-HS: 3 Relays - load up to 200W/gang
- L8-HD: 1 Dimmer - load up to 200W/gang
- L8-HB: Boiler switch - load up to 16A
- L8-HT: Thermostat switch - not tested!

#### Form factor

- EU model: 86mm x 86mm
- US model: 120mm x 74mm

Both models are rated at AC 100-250V ~50-60Hz, the form factor can be a design choice regardless of the continental area.

<div class="row justify-content-center">
        <a href="../../assets/images/devices/lanbon-l8-dimensions-us.png" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-6" data-title="Lanbon L8 - US dimensions" data-footer="">
            <img src="../../assets/images/devices/lanbon-l8-dimensions-us.png" class="img-fluid">
        </a>

        <a href="../../assets/images/devices/lanbon-l8-dimensions-eu.png" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-6" data-title="Lanbon L8 - EU dimensions" data-footer="">
            <img src="../../assets/images/devices/lanbon-l8-dimensions-eu.png" class="img-fluid">
        </a>
</div>

Both models have the same recessed housing sliding in the wall, sized 50x50mm, with rounded corners creating a diameter of about 59mm. This makes them suitable for both EU and US wall fixtures. The EU model fits in a properly deployed, standard 60mm round wall box and can be fixed with two side screws (use the screws which belong to the box instead of the ones shipped with the device), the US model fits in the standard rectangular box and can be fixed through the oval holes located 3 1/4" apart. The depth of the wall box has to be at least 35-40mm because some room is needed for the wires coming out straight of the device.


#### Bezel Color

- Black
- White

#### Features:

- Input voltage 110-250V ~ 50-60Hz AC
- ESP32-WROVER-B
- Capacitive touch screen
- Energy counter

| Pros           | Cons
|:-----          |:----
| 8 MB flash     | Mood LEDS not uniform
| 8 MB PSram     | 
| Capactitive touch |
| Built-in PSU |
| Energy monitor |
| Standard wallmount form factor both EU and US |

!!! note "Note 1"
    An earlier revision V1.14 (20191203) of the PCB had an analog temperature sensor onboard.
    It was removed from V1.15 (20200521) of the PCB. You are likely *not* to get it when buying a recent switch.

!!! note "Note 2"
    There is a new V1.17 of the PCB with Tuya support.
    openHASP does **not** support the proprietary Tuya chip, but you can still flash the firmware
    and use the other Lanbon L8 features just fine.


## Contents

![Display image](../assets/images/devices/lanbon-l8-contents.png)

## Flashing

!!! warning "Disclaimer"
    Never connect high-voltage when the panel is not properly secured in place.

![Display image](../assets/images/devices/lanbon-l8-pcb.png)

You can follow this [flashing guide](https://blakadder.com/lanbon-L8-custom-firmware/) on [blakadder.com](https://blakadder.com) or [this discussion post](https://github.com/HASwitchPlate/openHASP/discussions/76) with instructions and photos to flash the firmware without having to open the device.

Steps:

1. Disengage the high-voltage power
2. Detach the panel from the PSU power supply
3. Connect RX, TX, IO0, GND and 5V pins to the female pinheader:
4. Because there is no `RESET` pin, you need to powercycle the board with `IO0` connected to `GND` to activate flash mode

Once the serial connections are made, flash the [Lanbon-L8 ESP32 binary](../installation/esp32.md) like on any other device.

## GPIO Settings

### 3-gang version L8-HS

Pin| Mode   | L8-HS      | Group | Default
---|--------|------------|-------|----
12 | Output | Relay (K3) | 1 | Low (Normal)
14 | Output | Relay      | 2 | Low (Normal)
26 | Output | Mood Red   | 4 | Low (Normal)
27 | Output | Relay      | 3 | Low (Normal)
32 | Output | Mood Green | 5 | Low (Normal)
33 | Output | Mood Blue  | 6 | Low (Normal)

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
    To create a page displaying the local relays as switches, try this very simple [pages.jsonl](../design/pages.md):
    ```json linenums="1"
    {"page":1,"id":1,"obj":"switch","x":30,"y":40,"w":180,"h":75,"radius":40,"radius2":40,"groupid":1}
    {"page":1,"id":2,"obj":"switch","x":30,"y":122,"w":180,"h":75,"radius":40,"radius2":40,"groupid":2}
    {"page":1,"id":3,"obj":"switch","x":30,"y":205,"w":180,"h":75,"radius":40,"radius2":40,"groupid":3}
    ```
    ![lanbon-3-switch-display](../assets/images/screenshots/lanbon-3-switch-display.png)


### Dimmer version L8-HD

Pin| Mode   | L8-HD      | Group | Default
---|--------|------------|---|----
12 | Output | Dimmer TX (K3)  | 1 | Low (Normal)
26 | Output | Mood Red   | 4 | Low (Normal)
32 | Output | Mood Green | 5 | Low (Normal)
33 | Output | Mood Blue  | 6 | Low (Normal)

!!! note "Warning"
    There are two versions of the dimmer configuration: `EU` and `AU`. The protocol used to command the dimmer module differs between the two!
    Make sure that you have the correct type configured under your GPIO Output settings for pin `12`. Use the `AU` configuration for any 120V/US compatible dimmer modules.

!!! tip
    To configure the GPIOs at once for L8-HD send to topic `hasp/<nodename>/config/gpio` a message with payload:
    EU version:
    ```json linenums="1"
    {"config":[3211532,197658,263456,329249,0,0,0,0]}
    ```

    AU/US version:
    ```json linenums="1"
    {"config":[3277068,197658,263456,329249,0,0,0,0]}
    ```

### Boiler version L8-HB

Pin| Mode   | L8-HB      | Group | Default
---|--------|------------|---|----
26 | Output | Mood Red   | 4 | Low (Normal)
27 | Output | Relay 16A (K1) | 1 | Low (Normal)
32 | Output | Mood Green | 5 | Low (Normal)
33 | Output | Mood Blue  | 6 | Low (Normal)

!!! tip
    To configure the GPIOs at once for L8-HB send to topic `hasp/<nodename>/config` a message with payload:  
    ```json linenums="1"
    {"gpio":{"config":[197658,263456,329249,721179,14,27,0,0]}}
    ```

!!! note "Developer Note"
    You can [build your own firmware](../compiling/customize.md) with GPIOs and many other parameters pre-configured in `user_config_override.h` as factory defaults for Lanbon L8.


## Wiring Diagrams

The switch supports several wiring configurations:

![Display image](../assets/images/devices/lanbon-l8-wiring.png)

!!! danger "Warning"
    Always follow the instructions from the installation guide and local safety regulations.
    Consult a licensed electrician when changing your electrical wiring.</br>

## Product Video

<div class="embed-responsive embed-responsive-16by9" style="max-width:560px; margin:auto;">
    <iframe title="YouTube video player" src="https://www.youtube.com/embed/QgE4WrgHrWg?rel=0&controls=1" class="embed-responsive-item" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
    </iframe>
</div>

<div style="margin:auto">
<video width="360" height="640" controls>
    <source src="../../assets/videos/cc_sampl_climate_control.mp4" type="video/mp4">Your browser does not support the video tag.
</video>
</div>


## Gallery

<div class="row justify-content-center">
    <a href="../../assets/images/builds/lanbon-l8-covers.png" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-4" data-title="Lanbon L8 Switch" data-footer="Lanbon L8 in operation as a 5-cover commander">
        <img src="../../assets/images/builds/lanbon-l8-covers.png" class="img-fluid">
    </a>
    <a href="../../assets/images/builds/lanbon-l8-lovelace.png" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-4" data-title="Lanbon L8 Switch" data-footer="Lanbon L8 in operation as sensors and switches panel">
        <img src="../../assets/images/builds/lanbon-l8-lovelace.png" class="img-fluid">
    </a>
    <a href="../../assets/images/builds/lanbon-l8.png" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-4" data-title="Lanbon L8 Switch" data-footer="Customized Lanbon L8 Switchplate">
        <img src="../../assets/images/builds/lanbon-l8.png" class="img-fluid">
    </a>
</div>

## LCD Configuration

The `lcd_config.ini` file specifies the different properties of the display, except for the actual pin configuration:

```ini linenums="1"
st7789v =
    -D ST7789_DRIVER=1
    ;-D CGRAM_OFFSET=1         ; Library will add offsets required
    -D TFT_SDA_READ            ; Read from display, it only provides an SDA pin
    -D TFT_WIDTH=240
    -D TFT_HEIGHT=320
    -D TFT_ROTATION=2          ; see TFT_ROTATION values
    ; -D TFT_INVERSION_OFF     ; for normal colors
    ; -D TFT_RGB_ORDER=TFT_RGB   ; Colour order Red-Green-Blue
    -D TFT_RGB_ORDER=TFT_BGR ; Colour order Blue-Green-Red
    -D SPI_FREQUENCY=80000000
    -D SPI_READ_FREQUENCY=6000000 
    -D USER_SETUP_LOADED=1
    -D SUPPORT_TRANSACTIONS
```

## HASP build_flags

Specify the LCD Configuration to use and define the GPIOs in the environment build flags:

```ini linenums="1"
build_flags =
    ${env.build_flags}
    ${esp32.build_flags}
    ${esp32.ps_ram}

;region -- TFT_eSPI build options ------------------------
    ${lcd.st7789v}
    -D LANBONL8
    -D TFT_RST=18        ; FCP pin2 RESET
    -D TFT_SCLK=19       ; FCP pin3 SCL
    -D TFT_DC=21         ; FCP pin4 D/C
    -D TFT_CS=22         ; FCP pin5 CS
    -D TFT_MOSI=23       ; FCP pin6 SDA
    -D TFT_MISO=25       ; FCP pin7 SDO
    -D TFT_BCKL=5
    -D TOUCH_DRIVER=6336
    -D TOUCH_SDA=4
    -D TOUCH_SCL=0
    -D TOUCH_IRQ=-1   ; not connected
    -D TOUCH_RST=-1   ; not used, connected to 3.3V on FCP pin10
    -D TOUCH_FREQUENCY=400000
    -D LED_RED=26
    -D LED_GREEN=32
    -D LED_BLUE=33
    -D RELAY_1=12
    -D RELAY_2=24
    -D RELAY_3=37
;endregion
```
