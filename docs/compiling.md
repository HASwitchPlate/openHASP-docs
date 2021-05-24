<h1>Compiling</h1>

## Install Visual Studio Code

- on [Linux](https://code.visualstudio.com/docs/setup/linux)
- on [MacOS](https://code.visualstudio.com/docs/setup/mac)
- on [Windows](https://code.visualstudio.com/docs/setup/windows)

Additional packages on Linux:
```
sudo apt update
sudo apt install git python3-venv
```

## Clone openHASP

Make sure to add the `--recursive` parameter when cloning the project from GitHub. Otherwise git will not download the required submodules in the `/lib` subdirectory.

```bash
git clone --recursive https://github.com/HASwitchPlate/openHASP
```

If you already cloned openHASP without the submodules, you can fetch the submodules seperately using:

```bash
git submodule update --init --recursive
```

To switch to a different branch use:

```bash
git clone --recursive https://github.com/HASwitchPlate/openHASP
cd openHASP
git checkout 0.4.0
git submodule update --init --recursive
```

## Open in PlatformIO

![Install PIO](assets/images/compiling/install_pio.png)

Open the project folder in [Visual Studio Code](https://code.visualstudio.com).
You will receive a popup to install PlatformIO IDE if it is not already installed.
This will automatically install all PlatformIO dependencies and the MCU compiler frameworks needed.

![PIO Installed](assets/images/compiling/pio_installed.png)

Restart Visual Studio Code when the PIO installation completes.

## Create a configuration

Copy `platformio_override-template.ini` to `platformio_override.ini` and uncomment the platforms for `esp32`and `esp8266`:

```
[platformio]
extra_configs =
	; Uncomment or edit the lines to show more User Setups in the PIO sidebar
    user_setups/esp32/*.ini
    user_setups/esp8266/*.ini
    ; user_setups/stm32f4xx/*.ini
```

Then Click on the "Refresh Project tasks" icon in PlatformIO to list all the configured environments.

## Customization

The file `include\user_config_override-template.h` lists the options you have to customize your build. Settings applied here will act as factory defaults in the firmware. Some of the available possibilities are:

- WiFi Settings
- MQTT Settings
- OTA Server Settings
- Syslog Settings
- Timezone
- Interface Language
- Web interface coloring
- Built-in fonts choice
- GPIO Templates

Copy it to `include\user_config_override.h` and change the settins per your needs.   
Also uncomment `-DUSE_CONFIG_OVERRIDE` in `platformio_override.ini` to ensure that the config overrides are taken into account during the compilation process.

## Compiling

### MCU Environments

![Build All](assets/images/compiling/build_all.png)

You can now run "Build" or "Build All" in PlatformIO to compile (all) the firmware.

### Native Linux build

For native linux_sdl builds, you also need:
```
sudo apt update
sudo apt install build-essential libsdl2-dev
```


### Native MacOS build

For native darwin_sdl builds, you also need [Homebrew](https://brew.sh):

```sh
brew install gcc sdl2
```


### Native Windows build

For native windows_sdl builds, you also need MingW:

Use [MSYS2](https://www.msys2.org/)

```sh
pacman -S mingw-w64-x86_64-gcc mingw-w64-x86_64-SDL2
```

Add the path to your Mingw-w64 `bin` folder to the Windows PATH environment
variable (usually `C:\msys64\mingw64\bin`). See [instruction, 4](https://code.visualstudio.com/docs/cpp/config-mingw#_prerequisites).

<!--
## Development
-->


### Block Diagram

![Block Diagram](assets/images/block-diagram.svg)

## MQTT Tests

To run the tavern testing suite, install the tavern python package and configure `test\config.yaml` with your broker settings.

```bash
pip install tavern
tavern-ci .\test\
```
