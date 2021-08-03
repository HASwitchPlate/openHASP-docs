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

Copy it to `include\user_config_override.h` and change the settins per your needs.   
Uncomment `-DUSE_CONFIG_OVERRIDE` in `platformio_override.ini` to ensure that the config overrides are taken into account during the compilation process.
