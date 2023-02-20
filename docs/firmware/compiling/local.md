# Compiling locally

Even though openHASP is available in several pre-compiled firmware variants, sometimes the ready-to-flash binaries aren't enough.
If you need to customize some features, or simply change some parameters, then you need to compile a firmware binary yourself.  
The guide below will describe how to make your own build from source on your local PC.  

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

Make sure to add the `--recursive` parameter when cloning the project from GitHub. Otherwise git will not download the required submodules in the `/lib` subdirectory. To clone the current development version (_main_ branch):

```sh linenums="1"
git clone --recursive https://github.com/HASwitchPlate/openHASP
```

If you already cloned openHASP without the `--recursive` parameter, you can fetch the submodules separately using:

```sh linenums="1"
git submodule update --init --recursive
```

To switch to a different branch (for example {< openhasp.version >} release) use:

```sh linenums="1"
git clone --recursive https://github.com/HASwitchPlate/openHASP
cd openHASP
git checkout {< openhasp.version >}
git submodule update --init --recursive
```

## Open in PlatformIO

![Install PIO](../images/install_pio.png)

Open the project folder in [Visual Studio Code](https://code.visualstudio.com).
You will receive a popup to install PlatformIO IDE if it is not already installed.
This will automatically install all PlatformIO dependencies and the MCU compiler frameworks needed.

![PIO Installed](../images/pio_installed.png)

Restart Visual Studio Code when the PIO installation completes.

## Create a configuration

Copy `platformio_override-template.ini` to `platformio_override.ini` and uncomment the platforms for `esp32`or `esp32s2`:

```
[platformio]
extra_configs =
    ; Uncomment or edit the lines to show more User Setups in the PIO sidebar
    ; user_setups/darwin_sdl/*.ini
    user_setups/esp32/*.ini
    user_setups/esp32s2/*.ini
    ; user_setups/linux_sdl/*.ini
    ; user_setups/stm32f4xx/*.ini
    ; user_setups/win32/*.ini
```

If you use [customization](customize.md), remove the comment from the line `-DUSE_CONFIG_OVERRIDE`:

```text
[override]
; -- Hasp config options --------------------------------------
build_flags =
; -- Uncomment the next line to use the file include/user_config_override.h settings
    -DUSE_CONFIG_OVERRIDE
```

Then Click on the "Refresh Project tasks" icon in PlatformIO to list all the configured environments.


## Compiling

### MCU Environments

![Build All](../images/build_all.png)

You can now run "Build" or "Build All" in PlatformIO to compile (all) the firmware.

### Native Linux build

For native linux_sdl builds, you also need:
```
sudo apt update
sudo apt install build-essential libsdl2-dev
```


### Native MacOS build

For native darwin_sdl builds, you also need [Homebrew](https://brew.sh):

```sh linenums="1"
brew install gcc sdl2
```


### Native Windows build

For native windows_sdl builds, you also need MingW:

Use [MSYS2](https://www.msys2.org/)

```sh linenums="1"
pacman -S mingw-w64-x86_64-gcc mingw-w64-x86_64-SDL2
```

Add the path to your Mingw-w64 `bin` folder to the Windows PATH environment
variable (usually `C:\msys64\mingw64\bin`). See [instruction, 4](https://code.visualstudio.com/docs/cpp/config-mingw#_prerequisites).

<!--
## Development
-->
