<h1>ILI9341 IPS Panel</h1>

![Display image](../assets/images/displays/ILI9341_IPS.jpg)

A 240x320 IPS TFT display with an ILI9341 controller and XPT2046 touch controller.

Improvement over TN versions of the display with amazing view angles.

## Pin Configuration

Pin| Function            |ESP32 Pin|Config Name|Display Pin |
---|---------------------| :---:   |-----------|------------|
1  | Module Ground       | GND     |           | GND
2  | Module Power 3.3v   | 3V3     |           | VCC
3  | SPI Clock           | GPIO18  | TFT_SCLK  | CLK
4  | Data Input          | GPIO23  | TFT_MOSI  | MOSI
5  | LCD Reset line      | GPIO15  | TFT_RST   | RES
6  | Data Command control| GPIO5   | TFT_DC    | DC
7  | Backlight           | GPIO21  | TFT_BCKL  | BLK
8  | Data Output         | GPIO19  | TFT_MISO  | MISO
9  | Chip Select         | GPIO26  | TFT_CS    | CS1
10 | Touch Select        | GPIO17  | TOUCH_CS  | CS2
11 | Touch Interrupt     |         |           | 

SPI MISO, MOSI and SCLK are shared between the touch controller and the LCD controller.

## Custom build
Define a custom environment in `platformio_override.ini` and add a new `esp32_ili9341_spi` entry under `extra_default_envs =` 

If you've wired pins differently, change the values below.

```
;-- ILI9341 SPI version ------------------------
[env:esp32_ili9341_spi]
platform = espressif32
platform_packages = framework-arduinoespressif32
framework = arduino
board = esp32dev
monitor_port = COM4
upload_port = ${env:esp32_ili9341_spi.monitor_port}
monitor_filters = esp32_exception_decoder
board_build.partitions = user_setups/esp32_partition_app1300k_spiffs1216k.csv

build_flags =
    ${env.build_flags}
    ${esp32.build_flags}
    -D ILI9341_DRIVER=1
    -D TFT_WIDTH=240
    -D TFT_HEIGHT=320
    -D TFT_ROTATION=0 ; see TFT_ROTATION values
    -D INVERT_COLORS=1  ; to fix colors
    -D SPI_FREQUENCY=60000000
    -D SPI_TOUCH_FREQUENCY=2500000
    -D SPI_READ_FREQUENCY=20000000
    -D USER_SETUP_LOADED=1
    -D TOUCH_DRIVER=2046     ; XPT2046 Resistive SPI touch panel driver
    -D SUPPORT_TRANSACTIONS
    ${esp32.vspi}        ; Use VSPI hardware SPI bus: 
                         ; TFT_MISO=19 | TFT_MOSI=23 | TFT_SCLK=18
                         ; MISO    = 8 | MOSI    = 4 | CLK     = 3
; wiring recommendations, change pins according to your wiring
    -D TFT_DC=5          ; DC,  lcd pin 3
    -D TFT_RST=15        ; RES, lcd pin 5
    -D TFT_BCKL=-1       ; BLK, lcd pin 7 (configurable via web UI (e.g. 21))
    -D TFT_CS=26         ; CS1, lcd pin 9
    -D TOUCH_CS=17       ; CS2, lcd pin 10  
    
lib_deps =
    ${env.lib_deps}
    ${esp32.lib_deps}

lib_ignore =
    ${env.lib_ignore}
    ${esp32.lib_ignore}

extra_scripts =
    ${env.extra_scripts}
    ${esp32.extra_scripts}
```
