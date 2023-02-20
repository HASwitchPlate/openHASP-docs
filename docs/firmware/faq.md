# Frequently Asked Questions

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

The openHASP *full* binary is meant to be flashed to address `0x0` instead. Use ESPtool, Flash Download Tools or Tasmota-PyFlasher.


### :question: Other question

For support using openHASP please find us on Github, Discord or Home Assistant:

[:material-github: Github Discussions][1]{target=_blank .md-button .md-button--primary }
[:custom-discord: Discord Chat][2]{target=_blank .md-button .md-button--primary }
[:material-home-assistant: Home Assistant Forum][3]{target=_blank .md-button .md-button--primary }

[1]: https://github.com/HASwitchPlate/openHASP/discussions
[2]: https://discord.gg/VCWyuhF
[3]: https://community.home-assistant.io/t/openhasp-an-mqtt-driven-touchscreen-scene-controller/300853
