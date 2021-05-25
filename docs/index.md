<img src="assets/images/logo.png" style="width:10rem"></img>
<span style="font-family: 'Lato', 'Arial', helvetica;  font-size: 400%; font-weight: bold">openHASP<span>

Control your home-automation devices from a customizable touchscreen UI connected via MQTT.

openHASP is a re-implementation of the popular HASwitchPlate sketch created by aderusha.
The [HASPone][1] project uses a Wemos D1 mini and requires a Nextion/TJC HMI display.
This rewrite removes the Nextion/TJC requirement by using the [Light and Versatile Graphics Library][2]
on the MCU to drive a commodity display.

This project also adds ESP32 and STM32F4 support to take advantage of the additional hardware capabilities.

### Demo Screens

[![screenshot](assets/images/screenshots/demo_switches_covers.png)](custom-component/sampl_conf.md#some-basic-controls) &nbsp; 
[![screenshot](assets/images/screenshots/demo_mediaplayer.png)](custom-component/sampl_conf.md#media-player) &nbsp; 
[![Screenshot](assets/images/screenshots/lanbon.png)](example-dashui.md) &nbsp;
[![Screenshot](assets/images/screenshots/demo_jaffa1.png)](integration_openhab.md) &nbsp; 

### Features

| Feature                 | ESP8266 | ESP32   | STM32F4
|-------------------------|---------|---------|----------
| SPI display             | :white_check_mark: yes | :white_check_mark: yes | :white_check_mark: yes
| Parallel display        | :x: no | :white_check_mark: yes | :white_check_mark: yes
| PWM Screen dimming      | :white_check_mark: yes | :white_check_mark: yes | :white_check_mark: yes
| Maximum Page Count      | 4       | 12 | 12
| Object Types / Widgets  | 14      | 15 | 15
| Dynamic Objects         | :white_check_mark: yes | :white_check_mark: yes | :white_check_mark: yes
| Theme Support           | yes     | yes     | yes
| [Custom .zi V5 font][4] | :white_check_mark: yes (latin1) | :white_check_mark: yes (latin1) | no
| [MDI and FontAwesome Icons][5]  | :white_check_mark: 1300+ | :white_check_mark: 1300+ | no
| PNG images              | :x: no | :grey_question: tbd | :grey_question: tbd 
| Network                 | :white_check_mark: Wi-Fi | :white_check_mark: Wi-Fi | :white_check_mark: Ethernet

### Support

For support using openHASP, please join the [#openHASP channel][6] on Discord
or use [Discussions][3] on Github.



[1]: https://github.com/HASwitchPlate/HASPone
[2]: https://github.com/lvgl/lvgl
[3]: https://github.com/HASwitchPlate/openHASP/discussions
[4]: https://github.com/fvanroie/HMI-Font-Pack/releases
[5]: https://fontawesome.com/cheatsheet/
[6]: https://discord.gg/VCWyuhF
