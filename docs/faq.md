<h1>Frequently Asked Questions</h1>

### :question: What is the difference between openHASP and HASPone

HASPone uses a d1-mini ESP8266 connected to a Nextion/TJC smart display via the serial port.
HASPone is the *go-to* firmware for using a Nextion/TJC screen in your Home Automation setup.

openHASP does not support Nextion/TJC displays because it needs to be able to drive the display directly.
It was created specifically to eliminate the proprietary hardware and take control of the screen.

So openHASP is a hard fork of the original HASwitchPlate project to run on open hardware.


### :question: The display stays white

The good news is the backlight is working, but a white screen is typical of a problem with the pin assignment (software config) or wiring (hardware):

1.  Check the serial log when the plate boots and look for the `TFT` pin assignments.
    The configured GPIOs must match the connections on the display.

2. If the pin configuration is OK then the next step is checking the connection from the ESP to the display:
    - Check the solder connections or jumper wires for bad connections or shorts
    - Test with a multi-meter if there is a good connection from the ESP pins to the display pins
    - Try disconnecting the wires from the touch device and only test the display first

### :question: Error: The firmware binary is invalid (magic byte=FF, should be E9)

ESPhome-Flasher does not recognize the openHASP *full* binary firmware correctly.
It expects the firmware to be written to address `0x10000` and will throw a "magic byte error".

The openHASP *full* binary is meant to be flashed to address `0x0` with ESPtool, Flash Download Tools or Tasmota-PyFlasher.

### :question: The font looks tiny

On ESP8266, the out-of-the box font is Unscii 8pt because this font takes up very little space in memory and on flash.
This default font is just intended to get the device setup, then you can Upload your own .zi font.

On ESP32, the default font is Roboto Condensed 12.


### :question: How to use Fontawesome icons?

Upload another .zi file named fontawesome*xx*.zi of the same point size as the normal text .zi font.
e.g. If your custom font is `arial24.zi´, you should also add a `fontawesome24.zi` file.

You can download `fontawesome.zip` from the [HMI Font Pack](https://github.com/fvanroie/HMI-Font-Pack/releases){target=_blank} repository.


### :question: Is there a file browser built-in?

Since v0.6.0 there is a native file browser included on ESP32.

You can use it to upload, download and edit files on the flash partition of the ESP32.
Using that webpage, you can right-click and delete files:

![HTTP configuration](assets/images/faq/faq_file_delete.png "Delete file")

Click on the File Editor button on the Main Webpage:

![HTTP configuration](assets/images/faq/faq_file_browser.png "File Browser")


### :question: How to delete files from flash?

Yes: *See: Is there a file browser built-in?*