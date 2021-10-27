# Compiling online with Gitpod

Even though openHASP is available in several pre-compiled firmware variants, sometimes the ready-to-flash binaries aren't enough.
If you need to customize some features, or simply change some parameters, then you need to compile a firmware binary yourself.  
If you don't want to install an IDE (Integrated Development Environment) like PlatformIO or ATOM on your computer, compiling your own firmware is a breeze using [Gitpod](https://www.gitpod.io/){target=_blank}.

Gitpod is a web browser based online IDE. All you need to use it is to link your GitHub account (or make a new one [here](https://github.com/join?source=header){target=_blank}). Gitpod will take care of all the necessary software package dependencies for you.

## Load openHASP project in Gitpod

Click on one of the links below, and that will automatically load Gitpod with openHASP prepared for creating your custom build:

- Release (for example 0.6.2): [https://gitpod.io#https://github.com/HASwitchPlate/openHASP/tree/0.6.2](https://gitpod.io#https://github.com/HASwitchPlate/openHASP/tree/0.6.2){target=_blank}
- Development (_main_ branch): [https://gitpod.io#https://github.com/HASwitchPlate/openHASP](https://gitpod.io#https://github.com/HASwitchPlate/openHASP){target=_blank}

After Gitpod loads the project, you will be greeted by the main window.

<a href="../../assets/images/compiling/gitpod.png" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-8" data-title="GitPod" data-footer="">
    <img src="../../assets/images/compiling/gitpod.png" class="img-thumbnail">
</a>

## Choose the version you need

A copy of `platformio_override-template.ini` to `platformio_override.ini` will be readily prepared for you.  
Click `platformio_override.ini` to open it, and to select your firmware flavour for your hardware uncomment in the `extra_configs` section the platform of your hadware, for example for ESP32:

```text
[platformio]
extra_configs =
	; Uncomment or edit the lines to show more User Setups in the PIO sidebar
    ; user_setups/darwin_sdl/*.ini
     user_setups/esp32/*.ini
    ; user_setups/esp8266/*.ini
    ; user_setups/linux_sdl/*.ini
```

If you use [customization](customize.md), remove the comment from the line `-DUSE_CONFIG_OVERRIDE` and make sure you have your own `user_config_override.h` in place:   
(please consider before saving your wifi and mqtt credentials to an online cloud)

```text
[override]
; -- Hasp config options --------------------------------------
build_flags =
; -- Uncomment the next line to use the file include/user_config_override.h settings
    -DUSE_CONFIG_OVERRIDE
```

And finally select your supported hardware from the `extra_default_envs` section by uncommenting the corresponding line. For example to build firmware for Lanbon L8, you should remove that comment only:

```text
extra_default_envs =
    ; Comment unneeded environments or create extra
    ; arduitouch-esp32_ili9341
    ; d1-mini-esp32_ili9341
    ; d1-mini-esp8266_ili9341
    ; d132-unoshield
    ; esp12e-st7735
    ; esp32dev-mrb3511
    ; esp32dev-ili9488
     lanbon_l8
    ; lolin-d32-pro_ili9341
    ; my_custom_build
    ; nodemcu32s-raspi
    ; wt32-sc01
    ; ttgo_esp32_poe-ili9341
```
Save the file by pressing `Ctrl + S` or selecting `Save` from the top-left menu.

!!! note
    You can of course uncomment multiple lines, the system will make builds for each. Note that these environments rely on the platforms above so double-check that your hardware has the correct platform enabled in the `extra_configs` section!

!!! warning
    If you build from a development branch, you may not get the expected results, as it may contain undocumented or buggy features. Also, most likely a development branch has verbose logging enabled by default which adversely affects performance (for example setting `HASP_LOG_LEVEL` back to `LOG_LEVEL_TRACE` may bring speed to normal, otherwise the plate may become laggy).

## Build the firmware

To generate your customized firmware build, type `platformio run` in the command line area at the bottom, and press Enter key.

## Download the build

After the build successfully finishes, you will be able to find the downloadable binaries on the left panel, in the `build_output\firmware` folder.


