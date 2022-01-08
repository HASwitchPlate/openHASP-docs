<h1>ILI9341 TFT Panel</h1>

![Display image](../assets/images/displays/msp2807.png)

Models:

- 2.4" SKU: [MSP2402](http://www.lcdwiki.com/2.4inch_SPI_Module_ILI9341_SKU:MSP2402){target=_blank}
- 2.8" SKU: [MSP2807](http://www.lcdwiki.com/2.8inch_SPI_Module_ILI9341_SKU:MSP2807){target=_blank}
- 3.2" SKU: [MSP3218](http://www.lcdwiki.com/3.2inch_SPI_Module_ILI9341_SKU:MSP3218){target=_blank}

The "red" 240x320 TFT displays with an ILI9341 controller and XPT2046 touch controller are very common.

Make sure to select the touch version when ordering these screens online. The U2 touch chip needs to be populated on the board.


## Gallery

<div class="row justify-content-center">
    <a href="../../assets/images/builds/tabletop.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-4" data-title="TFT Desktopstand - front" data-footer="2.8&quot; LCD SKU: MSP2807 - image courtesy of <a href='https://www.thouters.be/HaspLvglBuild.html' target='_blank'>thouters.be</a>">
        <img src="../../assets/images/builds/tabletop.jpg" class="img-fluid">
    </a>
    <a href="../../assets/images/builds/back.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-4" data-title="TFT Desktopstand - back" data-footer="2.8&quot; LCD SKU: MSP2807 - image courtesy of <a href='https://www.thouters.be/HaspLvglBuild.html' target='_blank'>thouters.be</a>">
        <img src="../../assets/images/builds/back.jpg" class="img-fluid">
    </a>
    <a href="../../assets/images/builds/bottom.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-4" data-title="TFT Desktopstand - bottom" data-footer="TTGO T7 v1.4 Mini32 - image courtesy of <a href='https://www.thouters.be/HaspLvglBuild.html' target='_blank'>thouters.be</a>">
        <img src="../../assets/images/builds/bottom.jpg" class="img-fluid">
    </a>
</div>


## Pin Configuration

Pin| Function            |ESP32 Pin|Config Name|Display Pin |
---|---------------------| :---:   |-----------|------------|
1  | 5V/3.3V power input | 5V/3.3V |           | VCC
2  | Module Ground       | GND     |           | GND
3  | Chip Select         | GPIO26  | TFT_CS    | CS
4  | LCD Reset line      | GPIO15  | TFT_RST   | RESET
5  | Data Command control| GPIO5   | TFT_DC    | DC
6  | Data Input          | GPIO23  | TFT_MOSI  | SDI(MOSI)
7  | SPI Clock           | GPIO18  | TFT_SCLK  | SCK
8  | Backlight           | GPIO21  | TFT_BCKL  | LED
9  | Data Output (not used) | GPIO19 or N/C    | TFT_MISO  | SDO(MISO)
10 | Touch SPI Clock     | GPIO18  | TFT_SCLK  | T_CLK
11 | Touch Select        | GPIO17  | TOUCH_CS  | T_CS
12 | Touch Data Input    | GPIO23  | TFT_MOSI  | T_DIN
13 | Touch Data Output   | GPIO19  | TFT_MISO  | T_DO
14 | Touch Interrupt     | N/C     |           | T_IRQ

SPI MISO, MOSI and SCLK are shared between the touch controller and the LCD controller.

In some cases the pin 9 MISO of the LCD can prevent proper display initialization.
This pin is not used by openHASP, so it can be left disconnected in case of issues.


## LCD Configuration

The `lcd_config.ini` file specifies the different properties of the display, except for the actual pin configuration:

```ini linenums="1"
lolin24 =
    -D ILI9341_DRIVER=1
    -D TFT_WIDTH=240
    -D TFT_HEIGHT=320
    -D TFT_ROTATION=0 ; Use default, see TFT_ROTATION values
    -D SPI_FREQUENCY=40000000
    -D SPI_TOUCH_FREQUENCY=2500000
    -D SPI_READ_FREQUENCY=20000000
    -D USER_SETUP_LOADED=1
    -D TOUCH_DRIVER=2046     ; XPT2046 Resistive SPI touch panel driver
    -D SUPPORT_TRANSACTIONS
```

## HASP build_flags

Specify the LCD Configuration to use and define the GPIOs in the environment build flags:

```ini linenums="1"
build_flags =
    ${env.build_flags}
    ${esp32.build_flags}

;region -- TFT_eSPI build options ------------------------
    ${lcd.lolin24}
    ${esp32.vspi}        ; Use VSPI hardware SPI bus
    -D TFT_DC=5
    -D TFT_CS=26 
    -D TFT_RST=-1        ; RST
    -D TFT_BCKL=-1       ; None, configurable via web UI (e.g. 21)
    -D TOUCH_CS=17       ; (can also be 22 or 16)
;endregion
```