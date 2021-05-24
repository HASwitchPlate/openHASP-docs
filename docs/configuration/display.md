# Display Settings

Define the overal settings of the display driver.

## Web UI

![Display Settings](../assets/images/settings/display_settings.png "Display Settings")

### Short Idle 

When the display has not been touched for the Short Idle amount of seconds, an `idle = short` event will be sent out.

### Long Idle 

When the display has not been touched for Long + Short Idle amount of seconds, an `idle = long` event will be sent out.

The Long Idle period begins to count *after* the Short Idle period.

### Orientation

Rotate the display by the set number of degrees and optionally mirror the display as well.

### Show Pointer

Enable this option to show a mouse pointer. This helps with checking if the touches are correctly detected.

### Backlight Control

Sets the GPIO pin which is used for PWM dimming of the backlight.

### Calibrate

*Only available with XPT2046 resistive touchscreen controllers.*

Starts an onscreen calibration sequence.

---

Click 'Save Settings' to save your settings to the device. A restart is required to make the settings active. Navigate back to the Main Menu and click Restart to activate the settings.

