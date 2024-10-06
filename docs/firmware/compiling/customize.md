# Customization

The file `include\user_config_override-template.h` lists the options you have to customize your build. Settings applied here will act as factory defaults in the firmware. Check the file for the self-explanatory options. Some of the available possibilities are:

- WiFi Settings
- MQTT Settings
- OTA Server Settings
- Syslog Settings
- Timezone
- Interface Language
- Web interface coloring
- Built-in fonts choice
- GPIO Templates
- Services startup
- Memory handling

Copy it to `include\user_config_override.h` and change the settins per your needs.   
Uncomment `-DUSE_CONFIG_OVERRIDE` in `platformio_override.ini` to ensure that the config overrides are taken into account during the compilation process.

## Custom code

It is possible to include your own custom code in the `src/custom` directory. If you enable `#define HASP_USE_CUSTOM 1` in your `include\user_config_override.h`, you can start adding code by copying the template files as `my_custom.h` and `my_custom.cpp`. This will add the `custom\my_custom.h` header to openHASP compilation and call the defined functions from the main loop.
