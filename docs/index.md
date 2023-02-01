---
hide:
  - navigation
  - toc
---

<h1></h1>

<img src="assets/images/logo.png" style="width:10rem" class="float-left"></img>
<span style="font-family: 'Lato', 'Arial', helvetica;  font-size: 350%; font-weight: bold">openHASP<span>

<div class="clearfix">Control your home-automation devices from a customizable touchscreen UI connected via MQTT.</div>

*openHASP is a re-implementation of the popular HASwitchPlate sketch created by aderusha.
The [HASPone][1]{target=_blank} project uses a Wemos D1 mini and requires a Nextion/TJC HMI display.*

*This project is a complete rewrite and implements the [Light and Versatile Graphics Library][2]{target=_blank} on the MCU to drive a commodity display.
openHASP uses an ESP32 to take advantage of the additional hardware capabilities.*

### Demo Screens

Click on the demo screen to show the example configuration:

[![screenshot](assets/images/screenshots/demo_switches_covers.png)](integrations/home-assistant/sampl_conf/#some-basic-controls) &nbsp; 
[![screenshot](assets/images/screenshots/cc-sampl-weather-hours.png)](integrations/home-assistant/sampl_conf/#current-weather-and-forecasts) &nbsp;     
[![screenshot](assets/images/screenshots/demo_mediaplayer.png)](integrations/home-assistant/sampl_conf/#media-player) &nbsp; 
[![Screenshot](assets/images/screenshots/dashui-060.png)](integrations/examples/example-dashui.md) &nbsp;     
[![Screenshot](assets/images/screenshots/demo_jaffa1.png)](integrations/openhab/integration_openhab.md) &nbsp; 
[![screenshot](assets/images/screenshots/demo_climate.png)](integrations/home-assistant/sampl_conf/#generic-thermostatclimate) &nbsp;     

### Quotes

<div class="admonition quote1 col-sm-8">
    <p class="admonition-title">kazimir</p>
    <p>Hey man, openHASP is amazing. Currently running 12 pieces of Lanbon L8 plates in my house with your firmware.</p>
</div>
<div class="clearfix"></div>

<div class="admonition quote2 col-sm-9 float-right">
    <p class="admonition-title">danielo</p>
    <p>Oh man, integrating this with Home Assistant was super easy.</p>
    <p>Lucky you can't see me getting hyped about turning on/off my office lights from a tinny screen (and doing it like 3 or 4 times on a row...)</p>
</div>
<div class="clearfix"></div>

### Support

For support using openHASP you can find us on Github, Discord or Home Assistant:

[:material-github: Github Discussions][3]{target=_blank .md-button .md-button--primary }
[:custom-discord: Discord Chat][5]{target=_blank .md-button .md-button--primary }
[:material-home-assistant: Home Assistant Forum][6]{target=_blank .md-button .md-button--primary }

### Donate

The firmware is opensource and free to use!

If you like this project you can show your appreciation by making a small donation.
This will help with ofssetting the cost of the different hardware devices we support.

[![Paypal donation](https://img.shields.io/badge/Paypal-donate-00457C?style=for-the-badge&logo=paypal)](https://www.paypal.com/donate/?business=E76SN28JLZCXU&currency_code=EUR) &nbsp; 
[![Buy a coffee](https://img.shields.io/badge/Kofi-donate-FF5E5B?style=for-the-badge&logo=kofi)](https://ko-fi.com/openhasp) &nbsp; 
[![Buy me a coffee](https://img.shields.io/badge/Buy_Me_a_Coffee-donate-FFDD00?style=for-the-badge&logo=buymeacoffee)](https://www.buymeacoffee.com/aktdCofU)



[1]: https://github.com/HASwitchPlate/HASPone
[2]: https://github.com/lvgl/lvgl
[3]: https://github.com/HASwitchPlate/openHASP/discussions
[4]: https://github.com/fvanroie/HMI-Font-Pack/releases
[5]: https://discord.gg/VCWyuhF
[6]: https://community.home-assistant.io/t/openhasp-an-mqtt-driven-touchscreen-scene-controller/300853
[7]: design/objects/#cheatsheet
[8]: design/objects/#image
